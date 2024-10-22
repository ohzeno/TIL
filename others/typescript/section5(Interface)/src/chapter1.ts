// 인터페이스의 확장

// type Animal = {
// 타입이어도 확장 가능
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  // name: "hello"; // 기존 타입의 서브타입으로 재정의 가능
  isBark: boolean;
}

const dog: Dog = {
  name: "hello",
  // name: "멍멍이", //리터럴 타입으로 재정의됨
  age: 3,
  isBark: true,
};

interface Cat extends Animal {
  isScratch: boolean;
}

interface Chicken extends Animal {
  isFly: boolean;
}

interface DogCat extends Dog, Cat {
  // 다중 확장 가능
}

const dogCat: DogCat = {
  name: "hello",
  age: 1,
  isBark: true,
  isScratch: false,
};
