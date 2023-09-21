import requests
from urllib.parse import urljoin
from urllib.robotparser import RobotFileParser
import random
from selenium.webdriver.chrome.options import Options
from selenium import webdriver
import time

url = "https://www.naver.com/"

# robots.txt 규칙에 따라 접근 가능한지 확인
robot_url = urljoin(url, "/robots.txt")
rp = RobotFileParser()
rp.set_url(robot_url)
rp.read()
is_available = rp.can_fetch("*", url)
print(is_available)

# 랜덤 딜레이
random_sec = random.uniform(0.5, 1.5)
time.sleep(random_sec)

# 유저 에이전트, 얼라우 랭귀지 등
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
    "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6"
}
r = requests.get(url, headers=headers)

# 셀레늄에서 자동화 아니라고 표시하는 옵션
options = Options()
options.add_argument('--disable-blink-features=AutomationControlled')
driver = webdriver.Chrome(options=options)
