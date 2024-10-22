# express

[최상위 폴더](../../README.md)

[TOC]



## init

```bash
npm i express
npm i @types/express -D // ts와 함께. 컴파일 결과만 프로덕션에 올릴거면 -D 붙여줌
```

`npm i @types/express -D`  개발환경에서만 사용한다는 의미. 프로덕션 환경에서 compile된 결과를 실행할거면 -D를 붙여준다.



## 라우터/미들웨어

```jsx
import { NextFunction, Request, Response, Router } from "express";
import {
  readCat,
  updateCat,
  updatePartialCat,
} from "./cats.service";

const router = Router();

// 강의에선 라우터마다 에러코드를 작성해줬는데, 중복이라 미들웨어로 빼줬다.
const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 강의는 옛날이라 에러가 안난 것 같은데 요즘 ts에서는 error가 unknown 타입이라 error.message처럼 속성에 접근할 수 없다. 에러 객체인지 확인해주도록 변경하고 에러 객체가 아닌 경우도 처리해줬다.
  if (error instanceof Error) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  } else {
    res.status(500).send({
      success: false,
      error: "internal server error",
    });
  }
};

router.put("/cats/:id", updateCat); // 데이터 업데이트
router.patch("/cats/:id", updatePartialCat); // 부분적으로 업데이트는 patch

router.use(errorHandler); // 에러 처리용 미들웨어

export default router;
```

- use(미들웨어): 주소값 없이 실행됨. 함수를 인자로 받는다.
    - 일반적인 경우
      
        함수는 (req, res, next)를 인자로 받는다.
        
    - 에러 핸들링
      
        함수는 (error, req, res, next)를 인자로 받는다.
        
    - next
        - 라우터의 경우 현재 http 메서드와 일치하고 같은 url이 다음에 있으면 그걸 찾아감. 중간에 미들웨어가 있으면 미들웨어가 실행됨.
        - 미들웨어의 경우 그냥 다음으로.

```jsx
import { NextFunction, Request, Response } from "express";
import { Cat } from "./cats.model";

// 부분적으로 업데이트는 patch
export const updatePartialCat = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
		// :id는 req.params.id로 접근할 수 있다. 동적 라우팅.
    const params = req.params;
    const body = req.body;
    let result;
    Cat.forEach((cat) => {
      if (cat.id === params.id) {
        // 구조 분해 할당을 두 번 하면 중복되는 key가 있을 때 덮어씌워진다.
        cat = { ...cat, ...body };
        result = cat;
      }
    });
    res.status(200).send({
      success: true,
      data: {
        cat: result,
      },
    });
  } catch (error) {
    next(error);
  }
};
```

```tsx
import catsRouter from "./cat/cats.route";

class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

	private setRoute() {
    this.app.use(catsRouter);
  }	

	private setMiddleware() {
    // 모든 요청이 로깅부터 하고 다음으로 감.
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
  const server = new Server();
  server.listen();
}

init();
```