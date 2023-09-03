# NestJS

[공식문서](https://docs.nestjs.com/)

## Init

`nest new 프로젝트_이름` 이 명령어로는 프로젝트 자체에 git init이 실행된다.

git폴더로 관리하지 않길 원한다면(상위폴더가 git폴더라던가)

`nest new 프로젝트_이름 —skip-git` 을 사용한다.



## CLI

### `nest g~`  generate

`nest g mo 모듈_이름`

`nest g co 컨트롤러_이름`

`nest g s 서비스_이름`

`nest g middleware 미들웨어_이름`



## Controller

```tsx
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	// 의존성 주입.
  constructor(private readonly appService: AppService) {}

	//controller 인자로 주어진 주소 다음에 붙음.
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

@Controller()는 ‘/’ 주소로 들어온 api요청 라우팅.

@Get()은 해당 주소로 들어온 get요청.

@Controller(’cats’)아래에 @Get(’:id’)가 있으면 cats/123 등으로 들어오는 api요청을 처리함.



## Module

```tsx
-----------app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CatsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
-----------cats.module.ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
	exports: [CatsService]
})
export class CatsModule {}
```

[CLI에 나온 명령어들](NestJS%20de0996626e5b4122ace8bd9f17500d90.md)로 controller, service를 생성하면 cats.module.ts에 자동으로 추가된다.

하지만 app.controller.ts에 프로바이더를 의존성 주입 하기 위해서는 export를 해줘야한다. nest 모듈은 기본적으로 공급자를 캡슐화하여 은닉되기 때문에, 현재 모듈의 직접적인 부분이 아니거나 가져온 모듈에서 내보내지 않은 공급자를 주입할 수 없다.

app쪽에서 providers에 하위 모듈 공급자를 등록하지 말고 하위 모듈쪽에서 export에 등록하는 것이 중복을 줄여 단일성의 원칙에 맞다. 모듈의 exports에는 그 모듈에서 만든 서비스를 등록하는 것이 좋음.



## Middleware

express의 미들웨어와 동일함.

```tsx
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
```

모듈 데코레이터에는 미들웨어 자리가 없다. 모듈 클래스의 configure메서드를 이용한다. 미들웨어를 포함하는 모듈은 네스트 모듈 구현이 필요하다. AppModule 레벨에서 설정하자.

forRoutes는 해당 주소로 들어오는 요청에 대해 미들웨어를 사용한다는 뜻.



### Logger

```tsx
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      this.logger.log(
        `${req.method} ${req.ip} ${req.originalUrl} ${res.statusCode}`,
      );
    });
    next();
  }
}
```

로깅 미들웨어. 로깅은 Logger 인스턴스를 사용한다.

res.on으로 응답까지 로깅.



## ExceptionFilter

nest는 기본적으로 없는 url 요청은 자동적으로 404메시지를 리턴한다. 하지만 추가적인 정보를 담고싶은 경우도 있다. express가 new Error를 사용하는것과 달리 nest는 new HttpException을 사용한다. 

```tsx
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCats() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // throw new HttpException({ success: false, message: 'test' }, 401);
  }
}
```

HttpException의 첫 인자는 에러메시지, 두번째는 스테이터스 코드다. 코드는 int로 입력해도 된다. 메시지에 json객체를 넣어 응답 메시지를 커스텀 할 수도 있다. 스테이터스가 없는 객체로 커스텀할 경우 응답의 body에는 스테이터스 코드가 들어가지 않는다(스테이터스 라인에는 들어옴)

위와같이 일일이 처리하는건 비효율적이므로 챌린지 때 처럼 에러처리 모듈을 따로 만들어준다.

```tsx
----http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}  // 공식문서 코드
```

위 핉터를 여러 방법으로 사용할 수 있다.

```tsx
----cats.controller.ts
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/http-exception.filter';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @UseFilters(HttpExceptionFilter)
  getAllCats() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
```

이렇게 UseFilters를 사용하면 라우터 안쪽에서 에러가 발생하면 인자로 사용한 HttpExceptionFilter로 넘어간다. 여기서 보낸 에러메시지를 사용하려면 Filter쪽에서 

const error = exception.getResponse();로 받아와야 한다.

@UseFilters(HttpExceptionFilter)가 모든 라우터에 적용된다면 각각의 라우터에 달지 말고 CatsController 위에 붙여주면 된다.

cats.controller.ts 자체를 필터 범위로 지정하려면

```tsx
----cats.controller.ts
@UseFilters(new HttpExceptionFilter())
export class CatsController {}
```

전역범위 필터를 만드려면

```tsx
----main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
```

다만 이 경우는 모든 모듈 외부에서 등록되었기에 종속성 주입이 불가하다. 이를 해결하려면 다음처럼 직접 전역 필터를 등록할 수 있다. 더 자세한 내용은 [공식문서 Overview-Exception filters](https://docs.nestjs.com/exception-filters#binding-filters)로.

```tsx
----app.module.ts
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
```



## Pipe

```tsx
---cats.controller.ts
	@Get(':id')
  getOneCat(@Param('id', ParseIntPipe) id: number) {
    console.log(id, typeof id);
    return 'one cat';
  }
```

url 파라미터는 string으로 들어오는데, 이를 자동으로 변환해주고 유효성검사까지 할 수 있다.

위처럼 사용하면 cats/ 다음에 숫자가 들어오면 id는 number가 되고, 스트링이 들어오면 에러메시지를 리턴한다.



## Request lifecycle

1. Incoming request
2. Middleware
    - 2.1. Globally bound middleware
    - 2.2. Module bound middleware
3. Guards
    - 3.1 Global guards
    - 3.2 Controller guards
    - 3.3 Route guards
4. Interceptors (pre-controller)
    - 4.1 Global interceptors
    - 4.2 Controller interceptors
    - 4.3 Route interceptors
5. Pipes
    - 5.1 Global pipes
    - 5.2 Controller pipes
    - 5.3 Route pipes
    - 5.4 Route parameter pipes
6. Controller (method handler)
7. Service (if exists)
8. Interceptors (post-request)
    - 8.1 Route interceptor
    - 8.2 Controller interceptor
    - 8.3 Global interceptor
9. Exception filters
    - 9.1 route
    - 9.2 controller
    - 9.3 global
10. Server response



### env파일 사용

`npm i --save @nestjs/config`

[상세-공식문서](https://docs.nestjs.com/techniques/configuration)



## mongoose

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



## DTO(Data Transfer Object)

계층 간 데이터 전달을 위한 오브젝트.

```tsx
----dto/cats.request.dto.ts
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CatRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
---cats.controller.ts
	@Post()
  async signUp(@Body() body: CatRequestDto) {  // dto로 유효성검사
    console.log(body);
    return 'sign up';
  }
```



## 쿼리

`Model.exists({ email })` 해당 email이 존재하면 document, 없으면 null을 반환. promise니까 await 사용.



## 보안

### 해싱

```bash
npm i bctypt

npm i -D @types/bcrypt
```

```tsx
import * as bcrypt from 'bcrypt';
const hashedPassword = await bcrypt.hash(password, saltOrRounds);
```

hash함수의 두번째 인자는 saltOrRounds인데 암호학 용어다. 솔트는 원본 비밀번호에 추가한 후 해싱하여, 같은 비밀번호라도 다른 해시값을 생성하도록 한다. or rounds가 붙은 이유는, 해당 값이 정수가 아니면 솔트로 사용하고, 양의 정수이면 그 횟수만큼 salt를 생성하여 사용한다. 

값이 크면 레인보우 테이블에 없을 가능성이 올라가서 브루트포스 공격에 강해지지만 해시 생성 시간이 늘어난다.



### JWT

`npm install --save @nestjs/passport passport`

`npm install --save @nestjs/jwt passport-jwt`

`npm install --save-dev @types/passport-jwt`

—save는 package.json의 dependencies에 추가하라는 의미다. npm 5버전 부터는 기본 옵션이라 굳이 적지 않아도 된다.

—save-dev는 package.json의 devDependencies에 추가하라는 의미.



## api 문서 생성

`npm install --save @nestjs/swagger`

예전에는 express, swagger에 따라 설치방법이 달랐는데 지금은 통합됐다.
프로젝트와 [공식문서](https://docs.nestjs.com/openapi/introduction) 참고