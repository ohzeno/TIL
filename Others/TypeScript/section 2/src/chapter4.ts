// 타입 별칭
type User = {
  id: number;
  name: string;
  nickname: string;
  birth: string;
  bio: string;
  location: string;
};

let user: User = {
  id: 1,
  name: "a",
  nickname: "b",
  birth: "1999.01.01",
  bio: "hello",
  location: "Seoul",
};

let user2: User = {
  id: 2,
  name: "c",
  nickname: "d",
  birth: "1999.01.01",
  bio: "hello",
  location: "Seoul",
};

// 인덱스 시그니처
type CountryCodes = {
  [country: string]: string;
};

let countryCodes: CountryCodes = {
  Korea: "ko",
  UnitedStates: "us",
  UnitedKingdom: "uk",
};

type CountryNumberCodes = {
  [country: string]: number;
};

let countryNumberCodes: CountryNumberCodes = {}; // 빈 객체도 가능

type test1 = {
  [country: string]: string;
  Korea: string; // Korea는 무조건 있어야 한다.
  // Japan: number; 인덱스 시그니쳐와 일치하지 않는 타입은 불가
};
let test: test1 = {
  Korea: "ko",
};
