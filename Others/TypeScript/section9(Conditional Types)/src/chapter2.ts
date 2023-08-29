// infer
// 제네릭 타입이 특정 구조에 맞으면 그 구조 내부의 일부 타입을 사용함.

type FuncA = () => string;
type FuncB = () => number;

type ReturnType<T> = T extends () => infer R ? R : never;

// () => string가 () => infer R 구조이면 반환타입이 R로 추론됨.
type A = ReturnType<FuncA>;
type B = ReturnType<FuncB>;

// number[]가 (infer U)[] 구조이면 U가 number로 추론됨.
type ArrayElementType<T> = T extends (infer U)[] ? U : never;
type T3 = ArrayElementType<number[]>; // T3는 'number'
type T4 = ArrayElementType<string[]>; // T4는 'string'

// 추가 예제
type PromiseUnpack<T> = T extends Promise<infer U> ? U : never;

type PromiseA = PromiseUnpack<Promise<string>>; // string
