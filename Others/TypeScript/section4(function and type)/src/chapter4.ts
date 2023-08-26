// 사용자 정의 타입가드

type Dog = {
  name: string;
  isBark: boolean;
};

type Cat = {
  name: string;
  isScratch: boolean;
};

type Animal = Dog | Cat;

// 함수 반환값이 true면 명백히 animal이 Dog더라도 타입스크립트가 판단할 수 없음.
// Dog로 인식하도록 아래처럼 사용함.
// animal is Dog: 함수가 true를 반환하면 animal은 Dog 타입이라고 판단
function isDog(animal: Animal): animal is Dog {
  return (animal as Dog).isBark !== undefined;
}

function isCat(animal: Animal): animal is Cat {
  return (animal as Cat).isScratch !== undefined;
}

function warning(animal: Animal) {
  if (isDog(animal)) {
    console.log(animal.name + "가 짖습니다."); // animal에 마우스 올려보면 Dog로 인식
  } else {
    console.log(animal.name + "가 긁습니다.");
  }
}
