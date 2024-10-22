import { NextFunction, Request, Response, Router } from "express";
import {
  createCat,
  readAllcat,
  readCat,
  updateCat,
  updatePartialCat,
  deleteCat,
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

router.get("/cats", readAllcat); // 고양이 전체 조회

// :id는 req.params.id로 접근할 수 있다. 동적 라우팅.
router.get("/cats/:id", readCat); // 특정 고양이 조회
router.post("/cats", createCat); // 새 고양이 추가
router.put("/cats/:id", updateCat); // 데이터 업데이트
router.patch("/cats/:id", updatePartialCat); // 부분적으로 업데이트는 patch
router.delete("/cats/:id", deleteCat); // 데이터 삭제

router.use(errorHandler); // 에러 처리용 미들웨어

export default router;
