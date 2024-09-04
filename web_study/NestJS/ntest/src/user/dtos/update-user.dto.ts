import { PartialType, PickType } from '@nestjs/mapped-types';
import { User } from '../user.entity';

export class UpdateUserDto extends PartialType(
  PickType(User, ['name', 'age'] as const),
) {}
