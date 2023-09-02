import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  /* 
  Cat.name은 스키마의 name프로퍼티와 무관하고 스키마 클래스의 이름을 그대로 문자열로 반환한다.
  cats.module.ts에서 imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])]; 부분에서 모델을 등록하고 생성한다.
  Mongoose는 모델 이름을 소문자로 만들고 복수형으로 변환해서 db 컬렉션 이름을 만들거나 연결한다.
  이후 아까 생성된 모델이 InjectModel(Cat.name)을 통해 여기에 주입된다.
  */
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.catModel.exists({ email });
    /* 
    exists가 예전엔 boolean을 반환했었지만 그건 mongoose 5버전까지다. 그래서 강의에서는 return result; 로 되어있다. 6부터는 존재하면 document를 반환, 존재하지 않으면 null을 반환한다. 나는 코드 작성 시점에서 7버전을 사용중.
    db error가 발생하면 mongoose에서 에러를 throw한다. 그래서 여기에서는 try catch를 사용하지 않아도 된다.
    */
    return Boolean(result);
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}
