import { NextFunction, Request, Response } from "express";
import { Cat } from "./cats.model";

// 고양이 전체 조회
export const readAllcat = (req: Request, res: Response, next: NextFunction) => {
  try {
    const cats = Cat;
    // throw new Error("db connect error");
    res.status(200).send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (error) {
    next(error);
  }
};

// 특정 고양이 조회
// :id는 req.params.id로 접근할 수 있다. 동적 라우팅.
export const readCat = (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.params;
    // console.log(params);
    const cat = Cat.find((cat) => {
      return cat.id === params.id;
    });
    res.status(200).send({
      success: true,
      data: {
        cat,
      },
    });
  } catch (error) {
    next(error);
  }
};

// 새 고양이 추가
export const createCat = (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    Cat.push(data); // 여기선 배열에만 추가해주지만 실제로는 db에 추가해줘야 한다.
    res.status(200).send({
      success: true,
      data: { data },
    });
  } catch (error) {
    next(error);
  }
};

// 데이터 업데이트
export const updateCat = (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.params;
    const body = req.body;
    let result;
    Cat.forEach((cat) => {
      if (cat.id === params.id) {
        cat = body;
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

// 부분적으로 업데이트는 patch
export const updatePartialCat = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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

// 데이터 삭제
export const deleteCat = (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.params;
    const newCat = Cat.filter((cat) => cat.id !== params.id);
    res.status(200).send({
      success: true,
      data: newCat,
    });
  } catch (error) {
    next(error);
  }
};
