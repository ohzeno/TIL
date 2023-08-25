// 타입 단언. type assertion
type Person = {
  name: string;
  age: number;
};

let person = {} as Person;
person.name = "Lee";
person.age = 20;

type Dog = {
  name: string;
  color: string;
};

let dog = {
  name: "dog",
  color: "brown",
  breed: "poodle",
} as Dog;

/* 
타입 단언의 규칙
값 as 단언
A as B
A가 B의 슈퍼타입이거나 서브타입이어야 한다.
 */

let num1 = 10 as never; // never는 모든 타입의 서브타입이므로 가능.
let num2 = 10 as unknown; // unknown은 모든 타입의 슈퍼타입이므로 가능.
// let num3 = 10 as string  // 서로 관계가 없으므로 불가능.
let num3 = 10 as unknown as string; // 다중 단언으로는 가능하긴 함.

// const 단언
let num4 = 10 as const;

let cat = {
  name: "cat",
  color: "white",
} as const;

// cat.name = ''; // Error. readonly이므로 변경 불가.

// Non Null 단언
type Post = {
  title: string;
  author?: string;
};

let post: Post = {
  title: "Hello TypeScript",
  author: "Lee",
};

// const len: number = post.author?.length; // number | undefined는 number에 할당할 수 없다.
const len: number = post.author!.length; // !를 붙여서 null이 아님을 단언함.
