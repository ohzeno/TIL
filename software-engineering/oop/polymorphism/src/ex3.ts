import express, { Request, Response, NextFunction } from "express";

const app = express();

// 각 미들웨어는 동일한 인터페이스로 다른 동작을 수행할 수 있음.
const middleware1 = (req: Request, res: Response, next: NextFunction) => {
  console.log("Middleware 1");
  next();
};

const middleware2 = (req: Request, res: Response, next: NextFunction) => {
  console.log("Middleware 2");
  next();
};

app.use(middleware1);
app.use(middleware2);

app.listen(3000, () => {
  console.log("Server started");
});
