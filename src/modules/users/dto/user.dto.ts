import { Role, Service, UserModel } from '../domain/User';

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
  role: Role
  services: Service[];

  constructor(user: UserModel) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.services = user.services || [];
  }
}
