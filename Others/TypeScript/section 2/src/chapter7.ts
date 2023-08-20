// void
function test(): void {
  console.log("test");
}

// void 타입 변수에는 undefined만 할당할 수 있다.
// tsconfig에서 strictNullChecks 옵션을 false로 두면 null도 할당할 수 있다.
let a: void = undefined;
// a = 1;
// a = 'hello'
// a = {}
// a = null

// 5.1 이전에는 undefined 타입 함수는 return;이나 return undefined;을 사용해야 했다.
function test2(): undefined {
  console.log("test");
}

// null타입 함수는 null을 반환해야 한다.
function test3(): null {
  console.log("test");
  return null;
}

// never
// 함수가 항상 오류를 발생시키거나 절대 반환하지 않는 경우 사용.

function func1(): never {
  while (true) {}
}

function func2(): never {
  throw new Error();
}

// never타입은 모든 타입에 할당 가능하지만 어떤 타입도 never에 할당할 수 없다.
// strictNullChecks가 false여도 할당 불가.any타입 변수도 할당 불가.
let b: never;
// b = 1;
// b = {};
// b = "";
// b = undefined
// b = null;
let anyVar: any;
// b = anyVar;
