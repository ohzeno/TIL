// 함수 타입 정의
// 함수를 설명하는 가장 좋은 방법
// 어떤 매개변수 받고, 어떤 결과값 반환하는지 이야기
// 어떤 타입의 매개변수를 받고 어떤 타입의 결과값을 반환하는지 이야기
function func(a: number, b: number) {
  return a + b;
}

// 화살표 함수 타입 정의
const func2 = (a: number, b: number) => a + b;

// 함수의 매개변수
// 선택적 매개변수는 필수 매개변수보다 뒤에 위치해야 함
function introduce(name = "ㅎㅇ", age: number, tall?: number) {
  console.log(`제 이름은 ${name}입니다.`);
  // if (typeof tall === "number") {
  if (tall) {
    console.log(`제 키는 ${tall}입니다.`);
  }
}

introduce("김진석", 27, 180);
introduce("김진석", 27);

// 갯수 고정하고 싶으면 ...rest: [number, number] 이런식으로 정의
function getSum(...rest: number[]) {
  return rest.reduce((acc, cur) => acc + cur, 0);
}

getSum(1, 2, 3);
getSum(1, 2, 3, 4, 5);
