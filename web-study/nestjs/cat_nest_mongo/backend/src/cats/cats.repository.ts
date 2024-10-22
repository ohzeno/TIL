import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dtos/cats.request.dto';

@Injectable()
export class CatsRepository {
  /* 
  Cat.name은 스키마의 name프로퍼티와 무관하고 스키마 클래스의 이름을 그대로 문자열로 반환한다.
  cats.module.ts에서 imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])]; 부분에서 모델을 등록하고 생성한다.
  Mongoose는 모델 이름을 소문자로 만들고 복수형으로 변환해서 db 컬렉션 이름을 만들거나 연결한다.
  이후 아까 생성된 모델이 InjectModel(Cat.name)을 통해 여기에 주입된다.
  */
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findAll() {
    /*
    populate는 join과 비슷한 역할을 한다.
    
    const CommentModel = mongoose.model('Comment', CommentSchema);
    const result = await this.catModel.find().populate('comments', CommentModel);

    강의에서는 모델을 가져와서 populate의 두번째 인자로 넣어주는데, 현 버전(7.5.0)에서 populate의 두번째 인자는 옵션 설정에 사용되는 객체다. 모델을 전달하면 콜백함수로 해석하여 에러가 발생한다.
    Model.find() no longer accepts a callback
    MongooseError: Model.find() no longer accepts a callback

    옵션 객체를 전달하거나 생략해야 한다.

    populate의 첫 인자는 채워넣을 필드의 이름이다. 아래처럼 comments로 가상필드를 만들어놨으니 아래 내용이 적용된다. 여기서는 추가옵션이 없어서 옵션객체는 전달하지 않았다.
    _CatSchema.virtual('comments', {
      ref: 'Comment',
      localField: '_id',
      foreignField: 'targetId',
    });
    */
    const result = await this.catModel.find().populate('comments');
    return result;
  }

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id);
    cat.imgUrl = `http://localhost:${process.env.PORT}/media/${fileName}`;
    const newCat = await cat.save();
    console.log(newCat);
    return newCat.readOnlyData;
  }

  async findCatByIdWithoutPassword(
    catId: string | Types.ObjectId,
  ): Promise<Cat | null> {
    // 패스워드 제거
    const cat = await this.catModel.findById(catId).select('-password');
    return cat;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.catModel.exists({ email });
    /* 
    exists가 예전엔 boolean을 반환했었지만 그건 mongoose 5버전까지다. 그래서 강의에서는 return result; 로 되어있다. 6부터는 존재하면 document를 반환, 존재하지 않으면 null을 반환한다. 나는 코드 작성 시점에서 7버전을 사용중.
    db error가 발생하면 mongoose에서 에러를 throw한다. 그래서 여기에서는 try catch를 사용하지 않아도 된다.
    */
    return Boolean(result);
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}
