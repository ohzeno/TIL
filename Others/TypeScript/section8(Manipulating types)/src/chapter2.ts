// keyof 연산자
interface Person {
  name: string;
  age: number;
}

function getPropertyKey(person: Person, key: keyof Person) {
  return person[key];
}

const person: Person = {
  name: "Dev",
  age: 30,
};

getPropertyKey(person, "name");

// typeof로 객체 타입을 가져올 수 있음.
const test = {
  name: "dev",
  age: 10,
};
type TestKey = typeof test;
function getProperty(key: keyof typeof test) {}
