# Crawling

[최상위 폴더](../../README.md)

[TOC]



## Python

```py
from urllib.parse import urljoin
from urllib.robotparser import RobotFileParser

# robots.txt 규칙에 따라 접근 가능한지 확인
robot_url = urljoin(url, "/robots.txt")
rp = RobotFileParser()
rp.set_url(robot_url)
rp.read()
is_available = rp.can_fetch("*", url)
print(is_available)
```



### 꼼수들

```python
# 랜덤 딜레이
random_sec = random.uniform(0.5, 1.5)
time.sleep(random_sec)

# User-Agent, Accept-Language 등
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
    "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6"
}
r = requests.get(url, headers=headers)

# 셀레늄에서 자동화 아니라고 표시하는 옵션
options = Options()
options.add_argument('--disable-blink-features=AutomationControlled')
driver = webdriver.Chrome(options=options)
```



## JS

### 예시

```javascript
const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

function getData($, now, headlines) {
    let newsData = [];
    headlines.each((index, element) => {
        const news = $(element).find("div.sh_text > a");
        newsData.push({
            time: now,
            title: news.text().trim(),
            link: news.attr("href"),
        });
    });
    return newsData;
}

const response = await axios.get(url, {
    responseType: "arraybuffer",
});
const html = iconv.decode(response.data, "EUC-KR");
const $ = cheerio.load(html);
const now = getTime();
const headlines = $(
    "#main_content > div > div._persist > div.section_headline > ul > li"
);
let newsData = getData($, now, headlines);
```



### 하위폴더들

- [get_spread_average_target](get_spread_average_target/README.md)
