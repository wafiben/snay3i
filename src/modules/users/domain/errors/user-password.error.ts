export class UserWorngPassword extends Error {
  public readonly message!: string;
  constructor() {
    super('USER_WRONG_PASSWORD');
    this.name = 'USER_WRONG_PASSWORD';
  }
}
