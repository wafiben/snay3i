import { UserInMemory } from '../users/database/user-in-memory';
import { Role } from '../users/domain/User';
import { UserBuilder } from '../../test-utils/user-builder';
import { UserWorngPassword } from '../users/domain/errors/user-password.error';

describe('Auth user', () => {
  let userRepository: UserInMemory;
  let email: string;
  let password: string;

  beforeEach(async () => {
    userRepository = new UserInMemory();
    email = 'client@gmail.com';
    password = '000000';
    userRepository = new UserInMemory();

    const usersData = [
      {
        id: '1',
        name: 'Client User',
        email: email,
        password: password,
        role: Role.CLIENT,
      },
      {
        id: '2',
        name: 'Fatma',
        email: 'fatma@gmail.com',
        password: 'secret456',
        role: Role.FREELANCER,
      },
      {
        id: '3',
        name: 'Mehdi',
        email: 'mehdi@gmail.com',
        password: 'mehdi789',
        role: Role.FREELANCER,
      },
      {
        id: '4',
        name: 'Salma',
        email: 'salma@gmail.com',
        password: 'salmaClient',
        role: Role.CLIENT,
      },
    ];

    const users = usersData.map((data) =>
      new UserBuilder()
        .withId(data.id)
        .withName(data.name)
        .withPassword(data.password)
        .withEmail(data.email)
        .withRole(data.role)
        .build(),
    );

    for (const user of users) {
      await userRepository.addUser(user);
    }
  });


  it('client should login correctly', async () => {
    const client = await userRepository.clientLogIn(email, password);

    expect(client.email).toBe(client.email);
    expect(client.password).toBe(client.password);
    expect(client.id).toBe(client.id);
  });

  it('should throw an error password is wrong ', async () => {
    await expect(
      userRepository.clientLogIn(email, 'wrongpassword'),
    ).rejects.toThrow(UserWorngPassword);
  });
});
