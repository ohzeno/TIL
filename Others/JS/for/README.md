# JS for문

1. [js 변수 타입 선언X](#js-변수-타입-선언X)
2. [js 변수 타입 선언O](#js-변수-타입-선언O)
3. [Python의 경우](#Python)
4. [Java의 경우](#Java)

- js for문의 반복인자는 변수 타입을 선언하지 않으면 for문끼리 공유가 된다. 함수 안의 for문이더라도 함수 밖의 for문의 인자와 공유.

### js 변수 타입 선언X

```js
function test(){
    for (i = 0; i < 3; i++){
        console.log('    test '+String(i))
    }
}

for (i = 0; i < 3; i++){
    console.log('out '+ String(i))
    test()
}
---------------
out 0     
    test 0
    test 1
    test 2
```

test()에서 i가 3이 되어 밖의 for문에서 반복문이 더 이상 진행되지 않는다.

밖의 for문을 i < 4로 하더라도 test() 후 i++이 되어 i = 4가 되어 진행되지 않는다.

**밖의 for문을 i < 5로 하면 test()때문에 i가 계속 4로 초기화되어 무한루프가 된다.**

```js
function test(){
    for (i = 0; i < 3; i++){
        console.log('    test '+String(i))
    }
}
function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
}

for (i = 0; i < 5; i++){
    sleep(1000)
    console.log('out '+ String(i))
    test()
}
// 밖의 for문을 i < 5로 하면 test()때문에 i가 계속 4로 초기화되어 무한루프가 된다.
-----------------
out 0
    test 0
    test 1
    test 2
out 4
    test 0
    test 1
    test 2
out 4
    test 0
    test 1
    test 2
...
```



### js 변수 타입 선언O

```js
function test2(){
    for (var i = 0; i < 3; i++){
        console.log('    test '+String(i))
    }
}

for (var i = 0; i < 3; i++){
    console.log('out '+ String(i))
    test2()
}
-------------
out 0
    test 0
    test 1
    test 2
out 1
    test 0
    test 1
    test 2
out 2
    test 0
    test 1
    test 2
```



## 비교

### Python

```python
def test():
    for i in range(4):
        print(f'    test {i}')

for i in range(4):
    print(f'out {i}')
    test()
------------
out 0
    test 0
    test 1
    test 2
out 1
    test 0
    test 1
    test 2
out 2
    test 0
    test 1
    test 2
```



### Java

```java
package test;

public class test {
	public static void test() {
		for(var i = 0; i < 3; i++) {
			System.out.println("    test" + i);
		}		
	}

	public static void main(String[] args) {
		for(var i = 0; i < 3; i++) {
			System.out.println("out "+i);
			test();
		}
	}
}
--------------------
out 0
    test0
    test1
    test2
out 1
    test0
    test1
    test2
out 2
    test0
    test1
    test2
```

자바는 변수 타입 선언을 하지 않으면 에러가 발생해 실행이 되지 않는다.