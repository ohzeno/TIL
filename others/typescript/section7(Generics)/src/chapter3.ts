// 제네릭 인터페이스
interface KeyPair<T, U> {
  key: T;
  value: U;
}

// 사용할 때 타입 지정
let kp1: KeyPair<number, string> = { key: 1, value: "Kim" };

let kp2: KeyPair<boolean, string[]> = { key: true, value: ["a", "b"] };

// 인덱스 시그니처
interface NumberMap {
  [key: string]: number;
}

let numberaMap1: NumberMap = {
  key: -12,
  key2: 123,
};

// 인덱스 시그니처와 제네릭 인터페이스를 함께 사용하면
// 여러 타입 가능
interface Map<V> {
  [key: string]: V;
}

let stringMap: Map<string> = {
  key: "Kim",
};

let booleanMap: Map<boolean> = {
  key: true,
};

// 제네릭 타입 별칭
type Map2<V> = {
  [key: string]: V;
};

let stringMap2: Map2<string> = {
  key: "Kim",
};

/* 
제네릭 인터페이스 활용 예시
  - 유저 관리 프로그램
  - 유저 구분: 학생 유저 / 개발자 유저 
*/
interface Student {
  type: "student";
  school: string;
}

interface Developer {
  type: "developer";
  skill: string;
}

interface User<T> {
  name: string;
  profile: T;
}

// 제네릭 인터페이스를 사용하므로 유저가 Student인지 Developer인지 체크할 필요가 없다.
function goToSchool(user: User<Student>) {
  const school = user.profile.school;
  console.log(`Go to ${school}`);
}

const developerUser: User<Developer> = {
  name: "Kim",
  profile: {
    type: "developer",
    skill: "JS",
  },
};

const studentUser: User<Student> = {
  name: "Lee",
  profile: {
    type: "student",
    school: "Seoul",
  },
};
