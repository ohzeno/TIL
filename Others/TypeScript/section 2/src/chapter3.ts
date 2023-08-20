// 객체 리터럴
// 구조적 타입 시스템, Property based type system
let user: {
  id?: number; // 옵셔널 프로퍼티
  name: string;
} = {
  id: 1,
  name: "a",
};

user.id;

user = {
  name: "b",
};

let config: {
  readonly apiKey: string;
} = {
  apiKey: "asdf",
};
