## Iterator

[최상위 폴더](../../../README.md)

```python
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
```

```
10
break!
30
```

for문의 data를 data(리스트)에서 가져오는 경우 break 후 다시 for문이 실행되기에 

data는 10, 20, 10, 20 처럼 20이 불려온 후 브레이크- for문 다시 실행> 10 불러옴.

하지만 map 오브젝트는 iterator 객체이다.

iterator 객체는 반복 가능한 객체가 아니라 값을 차례대로 꺼내는 객체이기 때문에

10, 20을 꺼내온 후 break되어 for문이 다시 시작되더라도 

data에 10이 다시 할당되는 것이 아니라 남아있는 30이 불려오게 된다.