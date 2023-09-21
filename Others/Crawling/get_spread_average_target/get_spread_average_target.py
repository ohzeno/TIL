import requests
from bs4 import BeautifulSoup
import pandas as pd
import random
import time
from dotenv import load_dotenv
import os
from tqdm import tqdm

load_dotenv()

BASE_URL = os.environ.get("BASE_URL")
CSV_FILENAME = os.environ.get("CSV_FILENAME")


def get_csv() -> dict:
    # csv 파일이 없으면 생성
    if not os.path.exists(CSV_FILENAME):
        print("csv 파일이 없습니다. 정보 수집 시작")
        collect_codes(init=True)
    df = pd.read_csv(CSV_FILENAME, index_col=0)
    # 첫 번째 칼럼을 딕셔너리로 변환
    return df.to_dict()[df.columns[0]]


def check_status_code(response: requests.Response, code: str) -> bool:
    if response.status_code != 200:
        print(f"Failed to get data for {code}, status code: {response.status_code}")
        return False
    return True


def collect_codes(init: bool = False) -> None:
    code_list = [
        "NVDA",
        "SBUX",
        "AAPL",
        "TSLA",
        "AMZN",
        "MSFT",
        "GOOGL",
        "META",
        "AMD",
        "INTC",
        "PYPL",
        "NFLX",
        "ADBE",
        "CSCO",
        "PEP",
        "KO",
    ]
    if init:  # 초기화면 csv 안읽어옴.
        stock_dic = {code: "" for code in code_list}
    else:  # 초기화 아니면 csv 읽어옴.
        stock_dic = get_csv()
        # 코드 리스트에 있는 코드가 딕셔너리에 없으면 추가
        for code in code_list:
            if code not in stock_dic:
                stock_dic[code] = ""
    # 코드 순회
    for code in tqdm(stock_dic, desc="Collecting Code Links", ncols=100):
        # 링크 받아오기 성공하면 딕셔너리 업데이트
        stock_link = get_code_link(code)
        # ip밴 방지용 랜덤 딜레이
        time.sleep(random.uniform(0.5, 1))
        if stock_link:
            stock_dic[code] = stock_link
    # 순회 끝났으면 df로 변환 후 csv로 저장
    dict_to_csv(stock_dic)


def dict_to_csv(stock_dic: dict) -> None:
    df = pd.DataFrame.from_dict(stock_dic, orient="index")
    df.to_csv(CSV_FILENAME)


def get_code_link(code: str) -> str | None:
    # 검색페이지
    url = f"{BASE_URL}/search/?q={code}"
    response = requests.get(url)
    if not check_status_code(response, code):
        return None
    # html 파싱
    soup = BeautifulSoup(response.content, "html.parser")
    # 검색결과 테이블 상위 10개
    rows = soup.select(
        "#advanced-search__instruments > div.card-content.table-responsive > table > tbody > tr"
    )
    # 검색결과 테이블 순회
    for row in rows:
        # 국기
        flag_class = row.select_one("td.table-child--c.table-child--left > span > i")[
            "class"
        ]
        # 종목코드
        stock_code = row.select_one("td.table-child--cauto.txt-bold").text.strip()
        # 미국 주식이고 종목코드가 일치하면
        if "flag__us" in flag_class and stock_code == code:
            href = row.select_one("td.table-child--c.table-child--left > span > a")[
                "href"
            ]
            stock_link = href.split("/")[3]
            # 딕셔너리 업데이트하고 다음 종목코드로
            return stock_link
    print(f"{code}에 대한 검색결과가 없습니다.")
    return None


def update_link(code: str, stock_dic: dict) -> bool:
    stock_link = get_code_link(code)
    if stock_link:
        stock_dic[code] = stock_link
        dict_to_csv(stock_dic)
        return True
    print(f"{code}에 대한 링크 정보를 얻는데 실패했습니다.")
    return False


def get_spread_average(code: str) -> str | None:
    stock_dic = get_csv()
    # 딕셔너리에 없으면 링크 정보 수집
    if code not in stock_dic:
        print(f"{code}에 대한 링크 정보가 없습니다. 정보 수집 시작")
        if not update_link(code, stock_dic):
            return None
    while True:
        url = f"{BASE_URL}/quote/stock/{stock_dic[code]}/consensus/"
        response = requests.get(url)
        if check_status_code(response, code):  # 데이터 받아오기 성공하면 파싱으로.
            break
        if response.status_code == 302:
            print(f"{code}에 대한 주소가 변경됨. 주소 업데이트 작업 실행.")
            if not update_link(code, stock_dic):  # 주소 업데이트 실패하면 종료
                return None
            continue  # 주소 업데이트 후 다시 시도
        return None  # 200도 302도 아니면 종료

    soup = BeautifulSoup(response.text, "html.parser")
    element = soup.select_one(
        "#consensusdetail > div.card-content > div > div:nth-child(6) > div.c-auto.txt-align-right.txt-bold > span"
    )
    if not element:
        print("Spread / Average Element not found")
        return None
    return element.text.strip()


code = "NVDA"
data = get_spread_average(code)
if data:
    print(f"{code} Spread / Average Target: {data}")
