// 타입 추론
let a = 10;
let b = "hello";
let c = {
  id: 1,
  name: "Lee",
  profile: {
    nickName: "podo",
  },
  urls: ["naver.com", "google.com"],
};

let { id, name, profile } = c;
let [one, two, three] = [1, "hello", true];

function func(message = "hello") {
  return "hello";
}

// any타입의 진화. 암묵적으로 any타입으로 추론되면 할당되는 갑에 따라 진화함.
let d;
d = 10;
d.toFixed();
// d.toUpperCase();
d = "hello";
d.toUpperCase();
// d.toFixed();

const num = 10;
const str = "hello";

let arr = [1, "hello", true];
