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
    """
    종목 코드에 따른 고유 문자열이 저장된 csv 파일이 없으면 생성하고
    있으면 읽어와서 딕셔너리로 반환한다.

    Returns:
        dict: {종목 코드: 고유 문자열}
    """
    # csv 파일이 없으면 생성
    if not os.path.exists(CSV_FILENAME):
        print("csv 파일이 없습니다. 정보 수집 시작")
        collect_codes(init=True)
    df = pd.read_csv(CSV_FILENAME, index_col=0)
    # 첫 번째 칼럼을 딕셔너리로 변환
    return df.to_dict()[df.columns[0]]


def check_status_code(response: requests.Response, code: str) -> bool:
    """
    응답 코드가 200이 아니면 에러 메시지 출력하고 False 반환

    Args:
        response (requests.Response): requests.get()의 리턴값
        code (str): 종목코드

    Returns:
        bool: 응답 코드가 200이면 True, 아니면 False
    """
    if response.status_code != 200:
        print(f"Failed to get data for {code}, status code: {response.status_code}")
        return False
    return True


def collect_codes(init: bool = False) -> None:
    """
    종목 코드에 따른 고유 문자열을 수집해서 csv 파일로 저장한다.

    Args:
        init (bool, optional): 초기화 여부. Defaults to False.
    """
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
        stock_d = {code: "" for code in code_list}
    else:  # 초기화 아니면 csv 읽어옴.
        stock_d = get_csv()
        # 코드 리스트에 있는 코드가 딕셔너리에 없으면 추가
        for code in code_list:
            if code not in stock_d:
                stock_d[code] = ""
    # 코드 순회. tqdm은 진행상황을 보여주는 라이브러리
    for code in tqdm(stock_d, desc="Collecting Code Links", ncols=100):
        # 링크 받아오기 성공하면 딕셔너리 업데이트
        stock_link_str = get_code_link(code)
        # ip밴 방지용 랜덤 딜레이
        time.sleep(random.uniform(0.5, 1))
        if stock_link_str:
            stock_d[code] = stock_link_str
    # 순회 끝났으면 df로 변환 후 csv로 저장
    dict_to_csv(stock_d)


def dict_to_csv(stock_d: dict) -> None:
    """
    딕셔너리를 csv 파일로 저장한다.

    Args:
        stock_dic (dict): {종목 코드: 고유 문자열}
    """
    df = pd.DataFrame.from_dict(stock_d, orient="index")
    df.to_csv(CSV_FILENAME)


def get_code_link(code: str) -> str | None:
    """
    종목코드의 고유 문자열을 반환한다.

    Args:
        code (str): 종목코드

    Returns:
        str | None: 고유 문자열을 얻는데 성공하면 문자열, 실패하면 None
    """
    # 검색페이지
    url = f"{BASE_URL}/search/?q={code}"
    response = requests.get(url, headers=headers)
    # 응답 코드가 200이 아니면 None 반환
    if not check_status_code(response, code):
        return None
    # html 파싱
    soup = BeautifulSoup(response.content, "html.parser")
    # 검색결과 테이블 상위 10개 리스트로 반환.
    tbody = soup.select(
        "#advanced-search__instruments > div.card-content.table-responsive > table > tbody > tr"
    )
    # 검색결과 테이블 순회
    for tr in tbody:
        # 국기
        flag_class = tr.select_one("td.table-child--left > span > i")['class']
        # 종목코드
        stock_code = tr.select_one("td.txt-bold.table-child--centered").text.strip()
        # 미국 주식이고 종목코드가 일치하면 고유 문자열 반환
        if "flag__us" in flag_class and stock_code == code:
            href = tr.select_one("td.table-child--left > span > a")[
                "href"
            ]
            stock_link_str = href.split("/")[3]
            return stock_link_str
    # 검색결과가 없으면 None 반환
    print(f"{code}에 대한 검색결과가 없습니다.")
    return None


def update_link(code: str, stock_d: dict) -> bool:
    """
    종목 코드와 딕셔너리를 받아서 종목 코드에 대한 링크 정보를 업데이트한다.

    Args:
        code (str): 종목코드
        stock_d (dict): {종목 코드: 고유 문자열}

    Returns:
        bool: 링크 정보를 얻는데 성공하면 True, 실패하면 False
    """
    stock_link_str = get_code_link(code)
    if stock_link_str:
        stock_d[code] = stock_link_str
        dict_to_csv(stock_d)
        return True
    print(f"{code}에 대한 링크 정보를 얻는데 실패했습니다.")
    return False


def get_spread_average(code: str) -> str | None:
    """
    종목 코드에 대한 spread / average target을 얻어 반환한다.

    Args:
        code (str): 종목코드

    Returns:
        str | None: spread / average target을 얻으면 문자열, 실패하면 None
    """
    stock_d = get_csv()
    # 딕셔너리에 없으면 링크 정보 수집
    if code not in stock_d:
        print(f"{code}에 대한 링크 정보가 없습니다. 정보 수집 시작")
        if not update_link(code, stock_d):
            print(f"{code}에 대한 링크 정보 수집 실패")
            return None
    while True:
        url = f"{BASE_URL}/quote/stock/{stock_d[code]}/consensus/"
        response = requests.get(url, headers=headers)
        if check_status_code(response, code):  # 데이터 받아오기 성공하면 파싱으로.
            break
        if response.status_code == 302:
            print(f"{code}에 대한 주소가 변경됨. 주소 업데이트 작업 실행.")
            if not update_link(code, stock_d):  # 주소 업데이트 실패하면 종료
                print(f"{code}에 대한 링크 정보 수집 실패")
                return None
            continue  # 주소 업데이트 후 다시 시도
        return None  # 200도 302도 아니면 종료

    soup = BeautifulSoup(response.text, "html.parser")
    element = soup.select_one(
        "#consensus-analysts > div.card-content > div > div:nth-child(6) > div.c-auto.txt-align-right.txt-bold > span"
    )
    if not element:
        print("Spread / Average Element not found")
        return None
    return element.text.strip()


code = "NVDA"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
}  # 403 에러 방지용 헤더 추가
data = get_spread_average(code)
if data:
    print(f"{code} Spread / Average Target: {data}")
