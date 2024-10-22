// Mapped Type
interface User {
  id: number;
  name: string;
  age: number;
}

// 맵드 타입은 interface에서 사용 불가. type으로 새로 정의해야 함.
type ReadonlyUser = {
  readonly [key in keyof User]: User[key];
};

// 한 명의 유저 정보를 불러오는 기능
function fetchUser(): ReadonlyUser {
  return {
    id: 1,
    name: "Dev",
    age: 31,
  };
}

type PartialUser = {
  // [key in "id" | "name" | "age"]: User[key];
  [key in keyof User]?: User[key];
};

// 한 명의 유저 정보를 수정하는 기능
function updateUser(user: PartialUser) {
  // ...
}

updateUser({
  age: 32,
});
