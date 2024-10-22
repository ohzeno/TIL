import * as express from "express";
import { Cat, CatType } from "./app.model";

const app: express.Express = express();

// 미들웨어는 경로 무관하게 실행된다.
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("this is logging middleware");
  /* 
  경로가 없는 use(미들웨어)에서 next를 호출하면 다음 정의된 라우터나 미들웨어로 넘어간다.
  */
  next();
});

app.get("/cats/som", (req, res, next) => {
  console.log("this is som middleware");
  /* 
  라우터에서 next를 호출하면 동일한 경로에 대해 다음 미들웨어나 라우터로 넘어간다. 여기선
  app.get("/cats/som", (req, res) => {
    res.send({ som: Cat[1] });
  });
  로 넘어가게 됨.
  */
  next();
});

app.get("/", (req: express.Request, res: express.Response) => {
  res.send({ cats: Cat });
});

app.get("/cats/blue", (req, res, next: express.NextFunction) => {
  res.send({ blue: Cat[0] });
});

app.get("/cats/som", (req, res) => {
  res.send({ som: Cat[1] });
});

// 중간에 매칭되는 라우터가 없으면 next를 타고 모든 미들웨어가 실행됨.
app.use((req, res, next) => {
  console.log("this is error middleware");
  res.send({ error: "404 not found error" });
});

app.listen(8000, () => {
  console.log("server is on...");
});
