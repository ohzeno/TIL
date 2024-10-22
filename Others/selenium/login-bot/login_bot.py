from selenium import webdriver
import time
import sys
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains


def login(login_id, password):
    time.sleep(0.5)
    act.move_to_element(elem).move_by_offset(
        0, int(elem.size['height'] * 0.05 * 2)
    ).click().perform()
    time.sleep(1)
    act.send_keys(login_id).perform()
    act.move_to_element(elem).move_by_offset(
        0, int(elem.size['height'] * 0.05 * 3)
    ).click().perform()
    time.sleep(1)
    act.send_keys(password).perform()
    act.move_to_element(elem).move_by_offset(
        0, int(elem.size['height'] * 0.05 * 5)
    ).click().perform()
    time.sleep(1)
    act.move_to_element(elem).move_by_offset(
        0, int(elem.size['height'] * 0.05 * 2.5)
    ).click().perform()
    time.sleep(1.1)


def make_room(title):
    act.move_to_element(elem).move_by_offset(
        0, int(elem.size['height'] * 0.05 * -5)
    ).click().perform()
    time.sleep(1)
    act.send_keys(title).perform()
    act.move_to_element(elem).move_by_offset(
        int(elem.size['width'] * 0.05 * 6),
        int(elem.size['height'] * 0.05 * 8)
    ).click().perform()
    time.sleep(1)
    act.move_to_element(elem).move_by_offset(
        int(elem.size['width'] * 0.05 * 6),
        int(elem.size['height'] * 0.05 * 7)
    ).click().perform()
    time.sleep(1)


def find_room():
    act.move_to_element(elem).move_by_offset(
        int(elem.size['width'] * -0.375),
        int(elem.size['height'] * 0.05 * 4)
    ).click().perform()
    time.sleep(1)

# 크롬드라이버 설치경로
chromedriver = 'C:/Users/black/Downloads/chromedriver.exe'
sys.path.append(chromedriver)

# 띄울 탭 갯수
n = 6

# 옵션 추가
options = webdriver.ChromeOptions()
options.add_argument('window-size=1920x1080')
# 비디오, 마이크 허용
options.add_experimental_option("prefs", {
    "profile.default_content_setting_values.media_stream_mic": 1,     # 1:allow, 2:block
    "profile.default_content_setting_values.media_stream_camera": 1,  # 1:allow, 2:block
  })
driver = webdriver.Chrome(chromedriver, options=options)

# id, 비번 6개
login_id = [
    ("bearnote1", "12345678"),
    ("bearnote2", "11111111"),
    ("bearnote3", "11111111"),
    ("bearnote4", "11111111"),
    ("bearnote5", "11111111"),
    ("bearnote6", "11111111"),
]

# 접속 주소
# address = "https://ssafycrime.herokuapp.com/"
address = "http://localhost:3000/"

# js로 창 n-1개 띄우기
for _ in range(n-1):
    driver.execute_script('window.open("about:blank", "_blank");')
# 탭관리
tabs = driver.window_handles
time.sleep(1)

# 각 탭 지정 주소로 이동
for i in range(n):
    driver.switch_to.window(tabs[i])
    driver.get(address)

if address == "http://localhost:3000/":
    time.sleep(3.5)
elif address == "https://ssafycrime.herokuapp.com/":
    time.sleep(20)

# 다시 탭 이동
for i in range(n):
    driver.switch_to.window(tabs[i])
    time.sleep(0.4)
    # 유니티 캔버스 찾기
    elem = driver.find_element(By.XPATH, "//*[@id=\"unity-canvas\"]")
    # elem.location = {'x': 144, 'y': 302}
    # elem.size : {'height': 600, 'width': 960}
    act = ActionChains(driver)
    # 로그인
    login(login_id[i][0], login_id[i][1])
    # 첫 탭만 방만들기
    if i == 0:
        make_room("zze")  # 만들 방 이름
    # 남은 탭은 방 목록 띄우기
    else:
        find_room()








