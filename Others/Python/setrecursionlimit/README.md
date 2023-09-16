## sys.setrecursionlimit

[최상위 폴더](../../../README.md)

```python
import sys
sys.setrecursionlimit(5 + 4)

def test(num):
    print(num)
    try:
        test(num + 1)
    except Exception as err:
        print(err)
        
print(0)
test(1)
```

```
0
1
2
3
4
5
maximum recursion depth exceeded while calling a Python object
```

setrecursionlimit(n)은 n번째 재귀까지 들어갈 것으로 생각하고 있었으나,

첫 함수블럭을 1이라 하면 n - 4깊이까지 들어가는 것을 볼 수 있다.

그러므로 깊이 100 트리를 재귀탐색하는 함수를 원한다면 105 이상으로 두어야 한다.

(깊이 2더라도 재귀는 3까지 들어가기 때문에 104가 아닌 105)