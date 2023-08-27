// 사례 1.
function swap<T, U>(a: T, b: U) {
  return [b, a];
}

const [a, b] = swap("1", 2);

// 사례 2.
// T는 언노운으로 취급되어 인덱싱 불가.
// T배열로 설정.
function returnFirstValue<T>(data: T[]) {
  return data[0];
}

let num = returnFirstValue([1, 2, 3]);

let str = returnFirstValue(["a", "b", "c"]);

// data[0]은 T 자체의 타입인 number | string으로 추론된다.
let strNum = returnFirstValue([1, "b", "c"]);

// 튜플로 첫 요소 타입 지정
function returnFirstValue2<T>(data: [T, ...unknown[]]) {
  return data[0];
}

let num2 = returnFirstValue2([1, "b", "c"]);

// 사례 3.
// length 속성이 있는 객체 확장.
function getLength<T extends { length: number }>(data: T) {
  return data.length;
}

let len = getLength([1, 2, 3]);
let len2 = getLength(["a", "b", "c"]);
let len3 = getLength({ length: 10 });
let len4 = getLength("12345");
