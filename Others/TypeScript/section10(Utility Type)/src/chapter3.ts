// Exclude<T, U>
// T에서 U에 할당 가능한 타입을 제거한 타입을 정의함
type Exclude<T, U> = T extends U ? never : T;
// 조건부 타입에 Union 타입을 전달하면 분산적인 조건부 타입이 된다.
// Exclude<string, boolean> |
// Exclude<boolean, boolean>
// string | never
// string

type A = Exclude<string | boolean, boolean>;

// Extract<T, U>
// T에서 U에 할당 가능한 타입을 추출한 타입을 정의함
type Extract<T, U> = T extends U ? T : never;
// Extract<string, boolean> |
// Extract<boolean, boolean>
// never | boolean
// boolean

type B = Extract<string | boolean, boolean>;

// ReturnType<T>
// 함수 타입 T의 반환 타입을 정의함
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : never;

function funcA() {
  return "hello";
}

function funcB() {
  return 10;
}

type ReturnA = ReturnType<typeof funcA>;
type ReturnB = ReturnType<typeof funcB>;
// type ReturnC = ReturnType<string>;
