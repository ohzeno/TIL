// 제네릭

// 제네릭 함수
// <T> : 타입 변수.
// 입력 타입을 반환한다.
function func<T>(value: T): T {
  return value;
}

let num = func(10);
let str = func("hello");
let bool = func(true);

let arr = func<[number, number, number]>([1, 2, 3]);
