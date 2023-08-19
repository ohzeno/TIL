## Global

```python
a = 0
def test():
    global a
    a += 1

print(a)
test()
print(a)
--------------
0
1
```

python docs를 보면 global은 외부 스코프의 변수에 접근할 수 있게 해준다고 한다.

정상적으로 작동한다. **하지만**

```python
d = 10
def solution():
    print("Solution")
    b = 0
    c = [0]
    def check():
        global b, d
        try:
            d += 1
            b += 1
        except Exception as err:
            print(err)
            d += 1
            c[0] += 1
    print(b, d, c)
    check()
    print(b, d, c)

solution()
---------------
Solution
0 10 [0]
name 'b' is not defined
0 12 [1]
```

프로그래머스 등의 코딩테스트에서는 solution 함수를 작성하게 한다.

solution 함수 내부에서 평범하게 코딩하며 global을 사용하면 solution 함수 밖의 변수에 접근한다. 

그래서 solution 안에서 선언된 b에는 접근하지 못하여 에러가 발생한다. d의 경우 solution 밖에 있어 += 1이 두 번 적용된 것을 볼 수 있다.

##### 함수 안의 함수 안에서 상위 함수에서 선언된 변수에 접근하려면 c처럼 리스트 등을 사용하여 인덱싱으로 값에 접근하면 된다.