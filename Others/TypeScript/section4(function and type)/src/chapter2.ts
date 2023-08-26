/* 
함수 타입 호환성
특정 함수 타입을 다른 함수 타입으로 취급해도 괜찮은가를 판단
1. 반환값의 타입이 호환되는가
2. 매개변수의 타입이 호환되는가
*/

// 1. 반환값의 타입이 호환되는가
type A = () => number;
type B = () => 10;

let a: A = () => 10;
let b: B = () => 10;

a = b; // 업캐스팅
// b = a;  다운캐스팅.

// 2. 매개변수의 타입이 호환되는가
// 2-1. 매개변수의 갯수가 같을 때
type C = (value: number) => void;
type D = (value: 10) => void;

let c: C = (value) => {};
let d: D = (value) => {};

// c = d;  // 매개변수로 판단할 때는 업캐스팅이 안됨. 아래 참조
d = c;

type Animal = {
  name: string;
};

type Dog = {
  name: string;
  color: string;
};

let animalFunc = (animal: Animal) => {
  console.log(animal.name);
};
let dogFunc = (dog: Dog) => {
  console.log(dog.name);
  console.log(dog.color);
};

// animalFunc = dogFunc; // 업캐스팅
// 매개변수가 업캐스팅이면 아래처럼 없는 속성에 접근할 수 있기 때문에 안됨
// let testFunc = (animal: Animal) => {
//   console.log(animal.name);
//   console.log(animal.color);
// }

// 2-2. 매개변수의 갯수가 다를 때
type Func1 = (a: number, b: number) => void;
type Func2 = (a: number) => void;

let func1: Func1 = (a, b) => {};
let func2: Func2 = (a) => {};

func1 = func2;
// func2 = func1; // 매개변수 갯수가 줄어들기 때문에 안됨.
