// 타입 좁히기

type Person = {
  name: string;
  age: number;
};

// value => number: toFixed
// value => string: toUpperCase
// value => Date: getTime
function func(value: number | string | Date | null | Person) {
  // value.toFixed();
  // value.toUpperCase();
  // 타입가드 typeof, instanceof
  if (typeof value === "number") console.log(value.toFixed());
  else if (typeof value === "string") console.log(value.toUpperCase());
  // else if (typeof value === "object") console.log(value.getTime());
  else if (value instanceof Date) console.log(value.getTime());
  /* 
    강의에서는 Person이 클래스가 아니라서 instanceof를 사용할 수 없다고만 했다.
    js에서 클래스는 생성자 함수를 포함해야 한다. 물론 ES6 부터는 class를 따로 만들 수 있다.
    new Person처럼 생성자 함수를 사용해서 객체를 생성할 수 있어야 한다.
    type은 특정 형태의 객체를 의미하는데, 런타임에서는 존재하지 않는다.
    하지만 Number, String 등의 원시 타입은 생성자 함수를 통해 객체를 생성할 수 있기에 instanceof를 사용할 수 있다.
  */ else if (value && "age" in value) console.log(value.name);
}
