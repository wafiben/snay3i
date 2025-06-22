export class UserAuthorization extends Error {
  public readonly message: string;
  constructor() {
    super('HAVE NO RIGHT TO ACESS');
    this.name = 'HAVE NO RIGHT TO ACESS';
  }
}
