import time
import pandas as pd

t1 = time.time()
df_sheet_all = pd.read_excel(
    'test.xlsx',
	sheet_name=None,
	engine='openpyxl'
)  # 파이썬 3.9 이상에서 엔진을 openpyxl로 설정해주지 않으면 오류가 발생한다.

for sheet in df_sheet_all:
    # sheet에는 시트 이름만 문자열로 저장되므로 시트를 test에 불러와준다.
    test = df_sheet_all[sheet]
    # 판다스이므로 빠른 itertuples를 사용하여 순회한다.
    for row in test.itertuples():
        acc = 0
        if row.수수료 != '[]':
            # 수수료 목록이 존재하면 앞 뒤 [, ]를 제거하고
            # ', '로 split하여 원소들을 분리한 후 float으로 문자열을 소수로 변환한다.
            # map을 이용하여 모든 원소를 변환하였으니 다시 list화 후 최고값을 비용에 더한다.
            acc += max(list(map(float, row.수수료[1:-1].split(', '))))
        if row.거래세 != '[]':
            acc += max(list(map(float, row.거래세[1:-1].split(', '))))
        if row.세금 != '[]':
            acc += max(list(map(float, row.세금[1:-1].split(', '))))
        # 몇 년도 코스피/코스닥 매수/매도 비용 최고값을 반올림 후 부동소수점으로 출력
        print(f'{sheet} {row[1]} {round(acc, 5):.5f}')
        if row[1] == '매도':
            # 매수매도 출력 후 빈 줄 출력으로 가독성 확보
            print()
t2 = time.time()
print(f'소요시간: {t2-t1}')
