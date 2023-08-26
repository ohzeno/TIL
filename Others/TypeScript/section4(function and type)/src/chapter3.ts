/* 
함수 오버로딩
- 하나의 함수 func
- 모든 매개변수 타입 number
- Ver1. 매개변수 1개 -> 매개변수 * 20 출력
- Ver2. 매개변수 3개 -> 매개변수 합 출력
*/
// 구현 없이 선언만. 오버로드 시그니처
function func(a: number): void;
function func(a: number, b: number, c: number): void;

// 구현. 구현 시그니처
// function func() { }
// func() // 에러
// func(1)
// func(1, 2)  // 에러
// func(1, 2, 3)
function func(a: number, b?: number, c?: number) {
  if (typeof b === "number" && typeof c === "number") {
    console.log(a + b + c);
  } else {
    console.log(a * 20);
  }
}
