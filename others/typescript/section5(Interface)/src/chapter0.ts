// 인터페이스
// 상호 간에 정의한 약속 혹은 규칙.

interface Person {
  readonly name: string;
  age?: number;
  // sayHi: () => void;  // 함수 타입 표현식으로 적으면 오버로딩은 안됨.
  sayHi(): void; // 속성 이름 없이 (): void만 적으면 Person이 함수임을 의미함.
  sayHi(a: number, b: number): void; // 오버로딩
}

// 인터페이스는 유니온, 인터섹션 불가.
// 필요하다면 타입 별칭에서 적용.
type Type1 = number | string | Person;
type Type2 = number & string & Person;
const person0: Person | number = {
  name: "Mark",
  sayHi() {},
};

const person: Person = {
  name: "Mark",
  sayHi() {
    console.log(`안녕하세요 저는 ${this.name} 입니다.`);
  },
};

// person.name = "Anna";
person.sayHi();
person.sayHi(1, 2);
