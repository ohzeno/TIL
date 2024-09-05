import { IsString, IsInt, Min, Max, IsNotEmpty } from 'class-validator';

export class UserBaseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  @Max(130)
  @IsNotEmpty()
  age: number;
}
