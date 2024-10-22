// 조건부 타입

// number가 string을 상속받는지 확인
type A = number extends string ? string : number;

type ObjA = {
  a: number;
};

type ObjB = {
  a: number;
  b: number;
};

type B = ObjB extends ObjA ? number : string;

// 제네릭과 조건부 타입
type StringNumberSwitch<T> = T extends number ? string : number;

let varA: StringNumberSwitch<number>;
let varB: StringNumberSwitch<string>;

function removeSpaces<T>(text: T): T extends string ? string : undefined;
function removeSpaces(text: any) {
  /*   
  함수 내부에서 T는 unknown이라 조건부 타입의 결과를 모름.
  'string' 형식은 'T extends string ? string : undefined' 형식에 할당할 수 없습니다.
  T가 unknown이니 typeof를 사용해도 좁힐 수가 없어서 에러 발생.

  오버로딩을 이용해 text: any로 타입을 지정해주면 타입체크를 회피하게 되므로 에러가 발생하지 않는다.

  강의에서는 any를 사용하면 내부에서 조건부 타입의 결과를 알 수 있어서 에러가 사라진다고 설명하고 있지만 실제로는 any를 사용하면 타입체크를 회피하게 되어서 컴파일 에러가 발생하지 않는 것임.

  내가 추가로 작성한 줄을 보면 any타입에 toFixed()가 사용되고 있는데, 컴파일 시점에서는 any로 인해 타입체크를 회피하니 TS가 에러를 표시하지 않지만 
  런타임에서 input값이 number도 string도 아니면 에러가 발생하게 된다.
  */
  // if (typeof text !== "string") return undefined;
  if (typeof text !== "string") return text.toFixed();
  return text.replaceAll(" ", "");
}

let result = removeSpaces("hello world");
