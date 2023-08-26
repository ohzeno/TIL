// enum 타입
// 여러가지 값들에 각각 이름을 부여해 열거해두고 사용하는 타입

// 숫자형 enum
enum Role {
  ADMIN, // 할당 안해도 0부터 시작하여 1씩 더해나간다.
  USER = 1, // 특정 숫자를 지정하면 그 후부터는 그 숫자부터 1씩 더해나간다.
  GUEST,
}

enum Language {
  Korean = "ko",
  English = "en",
  Japanese = "jp",
}

const user1 = {
  name: "Neo",
  role: Role.ADMIN, // 0 <- 관리자
  Language: Language.Korean,
};

const user2 = {
  name: "Mike",
  role: Role.USER, // 1 <- 일반 유저
};

const user3 = {
  name: "Jane",
  role: Role.GUEST, // 2 <- 게스트
};

console.log(user1, user2, user3);
