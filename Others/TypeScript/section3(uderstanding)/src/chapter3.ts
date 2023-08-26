// 기본 타입간의 호환성

let num1: number = 10;
let num2: 10 = 10;

num1 = num2;

/* 
객체 타입간의 호환성
어떤 객체타입을 다른 객체타입으로 취급해도 괜찮은가? 
*/
type Animal = {
  name: string;
  color: string;
};

type Dog = {
  name: string;
  color: string;
  breed: string;
};

let animal: Animal = {
  name: "기린",
  color: "white",
};

let dog: Dog = {
  name: "돌돌이",
  color: "brown",
  breed: "진돗개",
};

animal = dog;
// dog = animal  // Error. Animal이 Dog의 슈퍼타입.

type Book = {
  title: string;
  price: number;
};

type ProgrmmingBook = {
  title: string;
  price: number;
  language: string;
};

let book: Book;
let programmingBook: ProgrmmingBook = {
  title: "Learn TypeScript",
  price: 20000,
  language: "TypeScript",
};

book = programmingBook;
// programmingBook = book; // Error. Book이 ProgrammingBook의 슈퍼타입.

// 초과 프로퍼티 검사. 객체 리터럴을 사용하면 작동해서 업캐스팅 불가.
let book2: Book = {
  title: "Learn TypeScript",
  price: 20000,
  // language: "TypeScript",
};

let book3: Book = programmingBook; // 변수를 할당하면 작동하지 않아 업캐스팅 가능.

function func(book: Book) {}
// 함수 인자로 서브타입 객체 리터럴 사용해도 초과 프로퍼티 검사 작동.
func({
  title: "Learn TypeScript",
  price: 20000,
  // language: "TypeScript",
});
func(programmingBook);
