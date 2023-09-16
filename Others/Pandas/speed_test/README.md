# Pandas 최적화를 위한 반복 속도 테스트

[최상위 폴더](../../../README.md)

[TOC]



### 실험 이유

>시계열 데이터를 이용한 테스트의 경우 열끼리 바로 계산하는 것이 아니라 행을 순서대로 하나하나 확인해봐야 할 경우가 있다. 
>그래서 판다스 최적화 관련 글을 보고 테스트를 해보았다. 
>https://aldente0630.github.io/data-science/2018/08/05/a-beginners-guide-to-optimizing-pandas-code-for-speed.html
>
>1만줄짜리 csv파일을 100번, 50번 for 루프로 반복하여 부족한 데이터 양으로 인한 오차를 줄였다.

```
# 100만줄 if문
simple_for_mil(df)  # 0:00:02.254001
iterrows_mil(df)  # 0:00:17.854610
itertuples_mil(df)  # 0:00:00.580000
dict_records_mil(df)  # 0:00:02.749000

# 50만줄 전부 함수적용
simple_for_func(df.copy())  # 0:00:03.161000
iterrows_func(df.copy())  # 0:00:13.193000
itertuples_func(df.copy())  # 0:00:02.128000
dict_records(df.copy())  # 0:00:03.132000

t1 = datetime.datetime.now()
for _ in range(50):
    df['고가'] = df['저가'] * 2
t2 = datetime.datetime.now()
print(f'열계산: {t2 - t1}')  # 0:00:00.009000
```

- 결과
  - 단순 for문이 iterrows보다 4배 느리다는 과거 데이터들과 달리 현재는 단순 for문이 4~8배 빨랐다.
    - 최적화 상황의 예외인 경우를 고려해 if문 뿐 아니라 모든 행에 함수를 적용해보기도 했다.
      - 두 경우 모두 단순 for문이 빨랐다.
    - 원본 글이 있는 사이트에 연결할 수 없어 날짜를 확인할 수 없다. 너무 오래된 글이라 판다스와 파이썬의 버전이 달라지면서 성능에 차이가 생겼을 가능성이 있다.
      - 한글 자료들은 최신글이더라도 인용 원문의 작성 년도가 2014년 등으로 오래된 경우가 많았다.
    
  - 다행히 itertuples는 오차를 감안하더라도 단순 for문보다 빨랐다. 앞으로 단순 행 반복은 itertuples를 사용해야겠다.
    - if문 적용시 if문 내부가 한 번만 실행되었기에 for문보다 4배가량 빨랐으나
    - 모든 줄 함수적용 시에는 함수 적용이 병목이 되어 1.5배 정도의 차이밖에 없었던 것 같다.
    
  - itertuples는 튜플 원소에 키값과 벨류가 함께 문자열로 표기되기에 조회가 불편하다.
    
    ```python
    for row in df.itertuples():
        a = row
    ```
    
    위와 같은 경우 a가 튜플이라 고가를 a[5]와 같이 인덱스로 받아왔었기에 불편하다 여겼었다. 하지만 a의 타입이  튜플이 아니라 Pandas였다.
    Pandas(Index=0, _1=0, 날짜='2000년 09월 22일', 종가=0.93, 오픈=0.9, 고가=0.94, 저가=0.89, 거래량='726.70M', _8='-7.92%')
    그리고 공식문서를 다시 읽어보니 a.고가 와 같이 키로 값을 받아올 수 있었다.
    
    
    
    - df.to_dict('records')를 사용하여 각 행을 딕셔너리로 받아봤다. 원하는 값을 조회하기는 편하지만 단순 for문과 속도 차이가 없었다.
    
  - df 자체 기능으로 열끼리 직접 계산하는 것이 가장 빠른 것은 확실하다.



### 함수 원문

```python
def simple_for_mil(df):
    t1 = datetime.datetime.now()
    # 100만줄 테스트
    for _ in range(50):
        for i in range(length):
            if df['고가'][i] == df_max:
                # i 넣어도 되는데 df.index 사용하는 이유는
                # 인덱스와 i가 다른 데이터를 취급할 경우를 가정하기 때문
                df.at[df.index[i], '고가'] = 11111
        for i in range(length):
            if df['고가'][i] == 11111:
                df.at[df.index[i], '고가'] = df_max
    t2 = datetime.datetime.now()
    print(f'단순 for문: {t2 - t1}')


def iterrows_mil(df):
    t1 = datetime.datetime.now()
    for _ in range(50):
        for idx, row in df.iterrows():
            if row['고가'] == df_max:
                df.at[idx, '고가'] = 11111
        for idx, row in df.iterrows():
            if row['고가'] == 11111:
                df.at[idx, '고가'] = df_max
    t2 = datetime.datetime.now()
    print(f'iterrows: {t2 - t1}')


def itertuples_mil(df):
    t1 = datetime.datetime.now()
    for _ in range(50):
        for row in df.itertuples():
            if row.고가 == df_max:
                df.at[row.Index, '고가'] = 11111
        for row in df.itertuples():
            if row.고가 == 11111:
                df.at[row.Index, '고가'] = df_max
    t2 = datetime.datetime.now()
    print(f'itertuples: {t2 - t1}')


def dict_records_mil(df):
    t1 = datetime.datetime.now()
    for _ in range(50):
        for row in df.to_dict('records'):
            if row['고가'] == df_max:
                df.at[row['Unnamed: 0'], '고가'] = 11111
        for row in df.to_dict('records'):
            if row['고가'] == 11111:
                df.at[row['Unnamed: 0'], '고가'] = df_max
    t2 = datetime.datetime.now()
    print(f'dict_records: {t2 - t1}')


def simple_for_func(df):
    t1 = datetime.datetime.now()
    # 50만줄 테스트
    for _ in range(50):
        for i in range(length):
            df.at[df.index[i], '고가'] = df.at[df.index[i], '저가'] * 2
    t2 = datetime.datetime.now()
    print(f'단순 for_50만_함수적용: {t2 - t1}')


def iterrows_func(df):
    t1 = datetime.datetime.now()
    for _ in range(50):
        for idx, row in df.iterrows():
            df.at[idx, '고가'] = row['저가'] * 2
    t2 = datetime.datetime.now()
    print(f'iterrows_50만_함수적용: {t2 - t1}')


def itertuples_func(df):
    t1 = datetime.datetime.now()
    for _ in range(50):
        for row in df.itertuples():
            df.at[row.Index, '고가'] = row.저가 * 2
    t2 = datetime.datetime.now()
    print(f'itertuples_50만_함수적용: {t2 - t1}')


def dict_records(df):
    t1 = datetime.datetime.now()
    for _ in range(50):
        for row in df.to_dict('records'):
            df.at[row['Unnamed: 0'], '고가'] = row['고가'] * 2
    t2 = datetime.datetime.now()
    print(f'dict_records_50만_함수적용: {t2 - t1}')
```

