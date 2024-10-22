// any
// 특정 변수의 타입을 확실히 모를 때
// 타입검사는 다 통과하지만 런타임에 에러 발생.
// 타입검사가 ts의 장점이므로 사용 지양.

let anyVar: any = 10;
anyVar = "hello";
anyVar = true;
anyVar = {};
anyVar = () => {};
anyVar.toUpperCase();
anyVar.toFixed();

let num: number = 10;
num = anyVar;

// unknown
// any와 비슷하게 어떤 타입이든 할당 가능.
// 하지만 다른 변수에 할당할 수 없고
// 타입검사를 통과하지 않았을 때는 타입 관련 함수 호출 불가.
let unknownVar: unknown;
unknownVar = "";
unknownVar = 10;
unknownVar = true;
unknownVar = {};
unknownVar = () => {};

// unknownVar.toUpperCase(); // error
// unknownVar.toFixed(); // error
// num = unknownVar; // error

if (typeof unknownVar === "number") {
  num = unknownVar;
  unknownVar.toFixed();
}
