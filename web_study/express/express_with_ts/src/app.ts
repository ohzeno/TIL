import * as express from "express";
import catsRouter from "./cat/cats.route";

class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  // 여기서는 한 줄이지만 실제로는 라우터 그룹이 여러개일 수 있으므로 함수로 빼준다.
  private setRoute() {
    this.app.use(catsRouter);
  }

  private setMiddleware() {
    // 모든 요청은 로깅부터 하고 다음으로 감.
    this.app.use((req, res, next) => {
      console.log(req.rawHeaders[1]);
      console.log("this is logging middleware");
      next();
    });

    // body를 읽을 수 있도록 해주는 미들웨어.
    // req.body의 json 데이터를 파싱하여 req.body로 읽을 수 있게 해준다.
    this.app.use(express.json());

    this.setRoute();

    // 매칭되는 라우터가 없을 경우 404
    this.app.use((req, res, next) => {
      console.log("this is error middleware");
      res.send({ error: "404 not found error" });
    });
  }

  public listen() {
    this.setMiddleware();
    this.app.listen(8000, () => {
      console.log("server is on...");
    });
  }
}

function init() {
  /* 
  강의에서는 이게 싱글톤이라고 하고, 
  수강생들의 질문에도 싱글톤은 하나의 클래스에 하나의 인스턴스만 찍어내고 사용하는 것이라고 했으나
  싱글톤은 하나의 클래스에 하나의 인스턴스만 존재하도록 설계되어야 한다.
  보통은 생성자를 private static으로 설정하여 첫 호출 시에만 인스턴스를 생성하고, 이후에는 그 인스턴스를 반환하도록 한다.

  또한 모듈 캐싱으로 인해 js 자체가 싱글톤이라는 말도 했는데,
  모듈 캐싱은 단순히 캐싱이다. constructor에 인자가 들어가는 경우 여러 인자로 여러 인스턴스를 생성할 수 있다. export, import가 아니면 의미 없는 말이기도 하다. 현재 이 app.ts에서 Server 클래스는 export되지 않았기에 캐싱되지도 않는다.

  그러므로 이 코드는 싱글톤 패턴이 아니다.
  */
  const server = new Server();
  server.listen();
}

init();

/* 
싱글톤 예시
class Singleton {
  private static instance: Singleton;

  private constructor() {
    ...some code
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

instance1.someMethod();
instance2.someMethod();

console.log(instance1 === instance2); // true
*/
