// 분산적인 조건부 타입

type StringNumberSwitch<T> = T extends number ? string : number;

let a: StringNumberSwitch<number>;
let b: StringNumberSwitch<string>;

/* 
유니온 타입을 넣으면 분산적 조건부 타입이 되어 
각 요소가T에 들어가서 분산적으로 처리된다.
StringNumberSwitch<number> -> string
StringNumberSwitch<string> -> number 
결과값 유니온 string | number가 된다.
*/
let c: StringNumberSwitch<number | string>;

// 실용적 예제
type Exclude<T, U> = T extends U ? never : T;

type A = Exclude<number | string | boolean, string>;
/*
Exclude<number, string> | 
Exclude<string, string> |
Exclude<boolean, string>

false | true | false
T | never | T
number | never | boolean
number | boolean -> never는 공집합이므로 제거
*/

type Extrace<T, U> = T extends U ? T : never;

type B = Extrace<number | string | boolean, string>;

// []로 묶으면 분산적인 조건부 타입이 되지 않고 유니온 타입 자체가 들어간다.
type dontDistribute<T> = [T] extends [number] ? string : number;
type C = dontDistribute<number | string>;
