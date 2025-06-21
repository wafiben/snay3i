import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    { id: 1, username: 'admin', password: 'admin' },
    { id: 2, username: 'user', password: 'user' },
  ];

  async findByUsername(username: string) {
    return this.users.find(user => user.username === username);
  }
}
