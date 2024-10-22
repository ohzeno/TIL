// 선언 합침
// 인터페이스는 중복 선언 가능하고 속성이 다르면 합쳐짐.
// 같은 속성은 같은 타입으로만 선언 가능

interface Person {
  name: string;
}

interface Person {
  age: number;
}

const person: Person = {
  name: "Mark",
  age: 39,
};

// 모듈 보강
// 라이브러리에 이미 선언된 인터페이스 보강 가능
interface Lib {
  a: number;
  b: number;
}

interface Lib {
  c: string;
}

const lib: Lib = {
  a: 1,
  b: 2,
  c: "hello",
};
