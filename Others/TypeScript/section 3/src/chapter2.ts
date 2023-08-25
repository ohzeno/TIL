// Unknown 타입. 모든 타입의 슈퍼타입. 전체 집합.
function unknownExam() {
  let a: unknown = 30;
  let b: unknown = "hello";
  let c: unknown = true;
  let d: unknown = null;
  let e: unknown = undefined;

  let unknownVar: unknown; // 다운캐스팅은 안됨.
  // let num: number = unknownVar;
  // let str: string = unknownVar;
  // let bool: boolean = unknownVar;
}

// Never 타입. 모든 타입의 서브타입. 공집합과 비슷하다.
function neverExam() {
  function neverFunc(): never {
    while (true) {}
  }

  let num: number = neverFunc();
  let str: string = neverFunc();
  let bool: boolean = neverFunc();

  let neverVar: never;
  // neverVar = 10;
  // neverVar = "hello";
  // neverVar = true;
}

// Void 타입
function voidExam() {
  function voidFunc(): void {
    console.log("voidFunc");
    return undefined; // void는 undefined의 슈퍼타입이므로 undefined를 리턴할 수 있다.
  }
}

// any 타입. 치트키. never제외하고 모든 타입의 슈퍼타입이 될 수도 있고 서브타입이 될 수도 있다.
function anyExam() {
  let unknownVar: unknown;
  let anyVar: any;
  let undefinedVar: undefined;

  /* 계층도에선 any가 unknown의 서브타입으로 표기됐지만 실제로는 계층도 밖에 존재한다고 보는게 나을 듯 하다 */
  anyVar = unknownVar;
  undefinedVar = anyVar;

  // 유일하게 never타입에는 할당할 수 없다. (공집합이기 때문에)
  let neverVar: never;
  // neverVar = anyVar;
}
