import { IsString, IsInt, Min, Max, IsNotEmpty } from 'class-validator';

export class User {
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  @Max(130)
  @IsNotEmpty()
  age: number;

  constructor(id: string, name: string, age: number) {
    this.id = id;
    this.name = name;
    this.age = age;
  }
}
