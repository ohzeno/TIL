# MongoDB

## Compass 명령어

### **데이터베이스 관련:**

- **`show dbs`** or **`show databases`**: 모든 데이터베이스 목록을 보여줍니다.
- **`use <database>`**: 특정 데이터베이스를 사용하도록 설정합니다.
    - ex) `use ye`
- **`db`**: 현재 사용 중인 데이터베이스의 이름을 출력합니다.
- **`db.dropDatabase()`**: 현재 데이터베이스를 삭제합니다.



### **컬렉션 관련:**

- **`show collections`**: 현재 데이터베이스의 모든 컬렉션을 나열합니다.
- **`db.createCollection(name, options)`**: 새로운 컬렉션을 생성합니다.
- **`db.collection.drop()`**: 특정 컬렉션을 삭제합니다.



### **CRUD 작업:**

### Create (삽입)

- **`db.collection.insertOne(document)`**: 하나의 문서를 삽입합니다.
    - ex) `db.users.insertOne({name: “test”, email: “test@gmail.com”})`
- **`db.collection.insertMany([documents])`**: 여러 문서를 삽입합니다.

### Read (조회)

- **`db.collection.find(query, projection)`**: 쿼리와 일치하는 문서를 찾아줍니다.
    - ex) `db.users.find()` 모든 데이터를 출력함
- **`db.collection.findOne(query, projection)`**: 쿼리와 일치하는 하나의 문서를 찾아줍니다.

### Update (수정)

- **`db.collection.updateOne(query, update, options)`**: 하나의 문서를 업데이트합니다.
    - ex) `db.users.updateOne({_id: ObjectId("64ef9b5a5938fd287fdb3071")}, {$set: {name: “mollu2}})`
- **`db.collection.updateMany(query, update, options)`**: 여러 문서를 업데이트합니다.

### Delete (삭제)

- **`db.collection.deleteOne(query)`**: 하나의 문서를 삭제합니다.
    - ex) `db.users.deleteOne({_id: ObjectId("64ef9b5a5938fd287fdb3071")})`
- **`db.collection.deleteMany(query)`**: 여러 문서를 삭제합니다.



### **인덱스 관련:**

- **`db.collection.createIndex(keys, options)`**: 컬렉션에 인덱스를 생성합니다.
- **`db.collection.getIndexes()`**: 컬렉션의 모든 인덱스 정보를 가져옵니다.
- **`db.collection.dropIndex(indexName)`**: 특정 인덱스를 삭제합니다.



## Mongoose

## with NestJS

```tsx
import * as mongoose from 'mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CatsModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),  // db 연결 uri
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    mongoose.set('debug', this.isDev);  // 개발때 쿼리 로깅
  }
}
```



### 스키마

`npm i --save class-validator class-transformer`

유효성 검사 패키지 받아줌.

```tsx
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);  // 스키마 생성
```

밸리데이션 데코레이터 작성 이후 main.ts에 등록

```tsx
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  const PORT = process.env.PORT;
  await app.listen(PORT);
}
```



### 쿼리

`Model.exists({ email })` 해당 email이 존재하면 document, 없으면 null을 반환. promise니까 await 사용.



### populate

[공식문서](https://mongoosejs.com/docs/populate.html)

```jsx
const mongoose = require('mongoose');
const { Schema } = mongoose;

const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);

const author = new Person({
	_id: new mongoose.Types.ObjectId(),
	name: 'Ian Fleming',
	age: 50
});

await author.save();
const story1 = new Story({
	title: 'Casino Royale',
	author: author._id
});
await story1.save();
const story = await Story.
	findOne({ title: 'Casino Royale' }).
	populate('author').
	exec();
// prints "The author is Ian Fleming"
console.log('The author is %s', story.author.name);

story.populated('author'); // truthy
story.depopulate('author'); // Make `author` not populated anymore
story.populated('author'); // undefined
```

RDBMS의 JOIN과 비슷한 역할을 해준다. 위 예시에서는 populate 후에 story.author가 채워진 것으로 보이지만, story객체에만 저장됐을 뿐이다. story.save()를 호출하면 그 때 db에 author._id가 저장된다. 

물론, id가 저장되는 것이라 populate로 호출해서 조회하면 id로 persons 컬렉션을 확인해서 가져온다.

nosql 특성상 참조데이터가 자동으로 업데이트 되지 않기 때문에 관련된 모든 컬렉션에서 직접 추가/삭제를 해주어야 한다.

```jsx
const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  content: String,
  // 다른 필드들...
});

const userSchema = new Schema({
  name: String,
  // 다른 필드들...
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }] // comments 필드에 Comment 스키마를 참조
});

const Comment = mongoose.model('Comment', commentSchema);
const User = mongoose.model('User', userSchema);

// 새로운 Comment 생성
const newComment = new Comment({ content: '이것은 댓글입니다' });
await newComment.save();

// 새로운 User 생성 후, 댓글 ID를 comments 필드에 추가
const newUser = new User({ name: '홍길동', comments: [newComment._id] });
await newUser.save();
```

populate는 가상필드에 대해 많이 사용된다.

```tsx
------cats.schema.ts
_CatSchema.virtual('comments', {
  ref: 'Comment', // 참조하는 모델(컬렉션이 아니라) 이름.
  localField: '_id', 
  foreignField: 'targetId', 
});
------cats.repository.ts
async findAll() {
	const result = await this.catModel.find().populate('comments');
	return result;
}
```

localField는 캣의 각 레코드의 _id를 의미하고 foreignField는 comments의 targetID를 의미한다. cats의 각 레코드에서 _id === targetId인 comment들을 모아서 comments라는 이름의 필드에 넣어준다.

객체에 결과가 저장된다고는 하지만 result가 매번 새로 생성되고 있어서 findAll이 호출될 때마다 cats의 각 레코드에서 

```python
for cat in cats:
    cat.comments = comments.find({ targetId: cat._id })
```

같은 작업이 일어난다. 물론 populate는 내부적으로 최적화되어 있기에 위처럼 2중for문같은 작업이 이루어지진 않는다(find가 comments의 모든 레코드를 살핀다고 가정한다는 의미. O(n^2)). 어쨌든 각 cat의 localField와 일치하는 comments를 모두 찾아야 하므로 연산이 그다지 효율적이진 않을 듯 하다.