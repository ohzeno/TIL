import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    example: 'email@google.com',
    description: 'email',
    required: true,
  }) // swagger의 api request body 예시에 추가됨
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'catName',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '0000aaaa',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({
    default:
      'https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg',
  })
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
    comments: Comment[];
  };

  readonly comments: Comment[];
}

const _CatSchema = SchemaFactory.createForClass(Cat);

_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
    comments: this.comments,
  };
});

_CatSchema.virtual('comments', {
  /* 
  강의에서는 컬렉션 네임을 넣어야 한다고 하는데, 그러면
  ERROR [ExceptionsHandler] Schema hasn't been registered for model "comments".
  Use mongoose.model(name, schema)
  이런 식으로 에러가 발생한다. 많은 사람들이 질문했는데, 강사는 버전문제라는 답변을 했고, 
  해결했다는 사람들은 의존성 주입 후 populate 인자에 path, model을 넣어서 해결했다(아마 참조할 모델 명을 덮어씌워서 작동한듯. 함수를 이해하지 못해서 그렇게 한듯.)

  현재(7.5.0) 기준으로 populate의 두번째 인자는 옵션객체이고, ref에는 컬렉션 네임이 아니라 모델명을 넣어야 한다.

  몽구스는 모델을 만들어서 컬렉션과 연결하여 작업한다.
  이 객체는 populate에 적용되면 Cat 스키마의 comments라는 가상필드를 채워넣는다.
  cats의 각 레코드의 comments 필드에 comments 컬렉션에서 targetId가 cats 레코드의 _id와 같은 것들을 채워넣는다.
  for cat in cats:
    cat.comments = comments.find({ targetId: cat._id })
  이런 느낌이다.
  */
  ref: 'Comment',
  localField: '_id', // Cats의 _id 필드와
  foreignField: 'targetId', // Comment의 targetId 필드를 비교해서 같은 것을 찾는다.
});
// virtuals는 기본적으로 db에 저장되지 않아서 toObject메서드를 사용할 때 포함되지 않는다. 아래 옵션을 true로 설정하면 포함된다. toJSON도 마찬가지다.
_CatSchema.set('toObject', { virtuals: true });
_CatSchema.set('toJSON', { virtuals: true });

export const CatSchema = _CatSchema;
