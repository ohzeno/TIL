import pandas as pd
import datetime


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
            if row[5] == df_max:
                df.at[row[0], '고가'] = 11111
        for row in df.itertuples():
            if row[5] == 11111:
                df.at[row[0], '고가'] = df_max
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
            df.at[row[0], '고가'] = row[6] * 2
    t2 = datetime.datetime.now()
    print(f'itertuples_50만_함수적용: {t2 - t1}')


def dict_records(df):
    t1 = datetime.datetime.now()
    for _ in range(50):
        for row in df.to_dict('records'):
            df.at[row['Unnamed: 0'], '고가'] = row['고가'] * 2
    t2 = datetime.datetime.now()
    print(f'dict_records_50만_함수적용: {t2 - t1}')


df = pd.read_csv("AAPL_10000.csv")
length = len(df)  # 10000
df_max = df['고가'].max()  # 최고가

# 100만줄 if문
simple_for_mil(df)  # 0:00:02.205000
iterrows_mil(df)  # 0:00:17.778895
itertuples_mil(df)  # 0:00:00.565999
dict_records_mil(df)  # 0:00:02.769001

# 50만줄 전부 함수적용
simple_for_func(df.copy())  # 0:00:03.126556
iterrows_func(df.copy())  # 0:00:12.512649
itertuples_func(df.copy())  # 0:00:02.072110
dict_records(df.copy())  # 0:00:03.073000

t1 = datetime.datetime.now()
for _ in range(50):
    df['고가'] = df['저가'] * 2
t2 = datetime.datetime.now()
print(f'열계산: {t2 - t1}')  # 0:00:00.009000



