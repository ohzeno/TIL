// 서로소 유니온 타입
// 교집합이 없는 타입들로 만든 합집합
type Admin = {
  tag: "ADMIN"; // tag를 string 리터럴 타입으로 만들어서 세 타입이 서로소가 됨.
  name: string;
  kickCount: number;
};

type Member = {
  tag: "MEMBER";
  name: string;
  point: number;
};

type Guest = {
  tag: "GUEST";
  name: string;
  visitCount: number;
};

type User = Admin | Member | Guest;

// Admin -> {name}님 현재까지 {kickCount}명 강퇴했습니다.
// Member -> {name}님 현재까지 {point}점을 모았습니다.
// Guest -> {name}님은 {visitCount}번 방문했습니다.
function login(user: User) {
  // 조건이 직관적이지 않음.
  // if ("kickCount" in user) {
  // } else if ("point" in user) {
  // } else {
  // }
  // 좀 더 직관적
  // if (user.tag === "ADMIN") {
  // } else if (user.tag === "MEMBER") {
  // } else {
  // }
  // 훨씬 직관적
  switch (user.tag) {
    case "ADMIN":
      console.log(`${user.name}님 현재까지 ${user.kickCount}명 강퇴했습니다.`);
      break;
    case "MEMBER":
      console.log(`${user.name}님 현재까지 ${user.point}점을 모았습니다.`);
      break;
    case "GUEST":
      console.log(`${user.name}님은 ${user.visitCount}번 방문했습니다.`);
      break;
    default:
      throw new Error("unreachable");
  }
}

// 복습 겸 추가 사례
// 비동기 작업의 결과를 처리하는 객체
type LoadingTask = {
  state: "loading";
};

type SuccessTask = {
  state: "success";
  response: {
    data: string;
  };
};

type FailTask = {
  state: "fail";
  error: {
    message: string;
  };
};

type AsyncTask = LoadingTask | SuccessTask | FailTask;
/* 
error는 fail에만 있어야 하지만 아래처럼 하면 case "fail"에서도 task.error?.message처럼 옵셔널 체이닝을 해야 한다. 이를 해결하기 위해 세 타입을 따로 만들고 AsyncTask를 서로소 집합으로 만든다.
{
  state: "loading" | "success" | "fail";
  error?: {  
    message: string;
  };
  response?: {
    data: string;
  };
};
*/

function processResult(task: AsyncTask) {
  switch (task.state) {
    case "loading":
      console.log("loading...");
      break;
    case "success":
      console.log(task.response.data);
      break;
    case "fail":
      console.log(task.error.message);
      break;
  }
}

const loading: AsyncTask = {
  state: "loading",
};

const success: AsyncTask = {
  state: "success",
  response: {
    data: "some data",
  },
};

const fail: AsyncTask = {
  state: "fail",
  error: {
    message: "some error message",
  },
};
