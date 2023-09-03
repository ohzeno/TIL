import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey', // 노출되면 안되니 나중에는 환경변수를 사용한다.
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    // 보안을 위해 패스워드를 제외한 나머지 정보만 반환한다.
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub,
    );
    /* 
    강의에서는 UnauthorizedException(403)을 사용했지만 삭제된 계정일 수도 있고 데이터베이스 오류로 고양이 정보가 사라졌을 수도 있다. 그런 경우 권한문제가 아니기 때문에 404가 더 적합해보인다.
    */
    if (!cat) throw new NotFoundException();
    return cat; // 라이브러리에 의해 validate의 return값이 req.user에 저장된다.
  }
}
