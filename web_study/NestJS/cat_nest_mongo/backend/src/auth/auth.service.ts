import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    // email이 존재하는가
    const cat = await this.catsRepository.findCatByEmail(email);
    if (!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    // password가 일치하는가
    const isPasswordValidated: boolean = await bcrypt.compare(
      password, // 입력받은 패스워드
      cat.password, // db에 저장된 해시된 패스워드
    );
    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    /* 
    jwt 페이로드. sub는 subject. 어떤 주체와 관련있는가. 일반적으로 사용자 id나 이메일 같은 고유 식별자를 사용한다.
    헤더, 시그니처는 라이브러리 내부에서 자동으로 생성됨.
    */
    const payload = { email: email, sub: cat.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
