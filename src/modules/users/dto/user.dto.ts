import { Service, UserModel } from '../domain/User';

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

export class SingleFrealancer {
  id: string;
  name: string;
  email: string;
  services: Service[];

  constructor(user: UserModel) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.services = user.services || [];
  }
}
