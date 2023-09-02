import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CatRequestDto } from './dto/cats.request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    /* 
    강의에서는 Promise<boolean>을 반환했지만 그건 mongoose 5버전까지고 6부터는 존재하면 document를 반환, 존재하지 않으면 null을 반환한다.
    나는 코드 작성 시점에서 7버전을 사용중.
    */
    const isCatExist = await this.catModel.exists({ email });
    // 강의에서는 UnauthorizedException(403)을 사용했지만 나는 conflict가 더 적합하다고 생각해서 409를 사용했다.
    if (isCatExist) {
      throw new HttpException(
        '이미 존재하는 고양이입니다.',
        HttpStatus.CONFLICT,
      );
    }
    // 10회 솔트 생성.
    const hashedPassword = await bcrypt.hash(password, 10);
    const cat = await this.catModel.create({
      email,
      name,
      password: hashedPassword,
    });
    return cat.readOnlyData; // 패스워드를 제거한 virtual 객체를 반환한다.
  }
}
