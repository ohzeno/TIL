import { CatsRepository } from '../cats.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CatRequestDto } from '../dto/cats.request.dto';
import * as bcrypt from 'bcrypt';
import { Cat } from '../cats.schema';

@Injectable()
export class CatsService {
  // db에 직접 접근하지 않고 repository 패턴을 사용한다.
  constructor(private readonly catsRepository: CatsRepository) {}

  async uploadImg(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`;

    console.log(fileName);

    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      fileName,
    );
    console.log(newCat);
    return newCat;
  }

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);
    // 강의에서는 UnauthorizedException(403)을 사용했지만 나는 conflict가 더 적합하다고 생각해서 409를 사용했다.
    if (isCatExist) {
      throw new HttpException(
        '이미 존재하는 고양이입니다.',
        HttpStatus.CONFLICT,
      );
    }
    // 10회 솔트 생성.
    const hashedPassword = await bcrypt.hash(password, 10);
    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });
    return cat.readOnlyData; // 패스워드를 제거한 virtual 객체를 반환한다.
  }
}
