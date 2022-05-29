datas = [10, 20, 30]
datas2 = map(int, '10 20 30'.split())
count = 0
while count < 5:
    count += 1
    for data in datas2:
        if data == 20:
            print('break!')
            break
        print(data)
