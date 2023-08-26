// 배열
let numArr: number[] = [1, 2, 3];

let strArr: string[] = ["a", "b", "c"];

// 제네릭(일반적인) 방식 타입 선언
let boolArr: Array<boolean> = [true, false, true];

// 배열에 들어가는 타입이 여러개일 경우
let multiArr: (number | string)[] = [1, 2, "hello"];

// 다차원 배열의 타입을 정의하는 방법
let doubleArr: number[][] = [
  [1, 2, 3],
  [4, 5],
];

// 튜플
// 길이와 타입이 고정됨.
// 배열로 취급되기 때문에 push, pop 사용 가능하나 길이 변하게 돼도 에러 발생하지 않으니 주의.
let tup1: [number, string] = [1, "hello"];

// 2차원배열 튜플 타입 선언의 경우 첫 []에 타입을 선언해야 한다.
const users: [string, number][] = [
  ["a", 123],
  ["b", 345],
  ["c", 567],
];
