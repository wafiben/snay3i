export class UserNotFoundError extends Error {
  public readonly message: string;
  constructor() {
    super('USER_NOT_FOUND');
    this.name = 'USER_NOT_FOUND';
  }
}
