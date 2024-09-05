export class User {
  id: string;
  name: string;
  age: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
