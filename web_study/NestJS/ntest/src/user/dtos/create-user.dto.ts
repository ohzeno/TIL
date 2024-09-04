import { PickType } from '@nestjs/mapped-types';
import { User } from '../user.entity';

export class CreateUserDto extends PickType(User, ['name', 'age'] as const) {}
