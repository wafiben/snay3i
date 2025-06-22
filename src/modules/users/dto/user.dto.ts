import { UserModel } from '../domain/User';

export class UserDto {
  id: string;
  name: string;
  email: string;

  constructor(user: UserModel) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}
