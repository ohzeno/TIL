// 함수 타입 표현식

type Operation = (a: number, b: number) => number;
const add: Operation = (a, b) => a + b;
const sub: Operation = (a, b) => a - b;
const multiply: Operation = (a, b) => a * b;
const divide: Operation = (a, b) => a / b;

// 호출 시그니처(콜 시그니처)
type Operation2 = {
  (a: number, b: number): number;
  name: string; // 하이브리드 타입. add2.name 이런식으로 사용 가능
};
const add2: Operation2 = (a, b) => a + b;
const sub2: Operation2 = (a, b) => a - b;
const multiply2: Operation2 = (a, b) => a * b;
const divide2: Operation2 = (a, b) => a / b;
