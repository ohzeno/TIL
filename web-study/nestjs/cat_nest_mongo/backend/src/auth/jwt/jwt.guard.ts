import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // strategy를 사용하기 위해 필요하다.

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
