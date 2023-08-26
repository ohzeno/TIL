/* 
대수 타입
- 여러 개의 타입을 합성해서 새롭게 만들어낸 타입 
- 합집합 타입과 교집합 타입이 존재.
*/

// 합집합. Union 타입
let a: string | number | boolean;
a = 1;
a = "hello";
a = true;

let arr: (number | string | boolean)[] = [1, "hello", true];

type Dog = {
  name: string;
  color: string;
};

type Person = {
  name: string;
  language: string;
};

type Union1 = Dog | Person;

let union1: Union1 = {
  name: "",
  color: "",
};

let union2: Union1 = {
  name: "",
  language: "",
};

let union3: Union1 = {
  name: "",
  color: "",
  language: "",
};

// 교집합은 모든 프로퍼티를 가지고, 교집합에 해당하지 않아도 Dog나 Person의 프로퍼티를 모두 가져야 한다. name만 있으면 합집합 밖의 상위 집합이 된다.
// let union4: Union1 = {
//   name: "",
// };

// 교집합. Intersection 타입
let variable: number & string;

type Intersection1 = Dog & Person;
let intersection1: Intersection1 = {
  name: "",
  color: "",
  language: "",
};
