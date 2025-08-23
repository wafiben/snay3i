import { UserInMemory } from '../../../users/database/user-in-memory';
import { UserBuilder } from '../../../../test-utils/user-builder';
import { Role } from '../../domain/User';
import { UserNotFoundError } from '../../../users/domain/errors/user-not-found.error';

describe('Get users', () => {
  let userRepository: UserInMemory;
  UserInMemory;

  beforeEach(async () => {
    userRepository = new UserInMemory();
  });

  it('should get freelancer By id', async () => {
    userRepository = new UserInMemory();

    const usersData = [
      { id: '1', name: 'Ali', password: 'pass123', role: Role.FREELANCER },
      { id: '2', name: 'Fatma', password: 'secret456', role: Role.FREELANCER },
      { id: '3', name: 'Mehdi', password: 'mehdi789', role: Role.FREELANCER },
      { id: '4', name: 'Salma', password: 'salmaClient', role: Role.CLIENT },
    ];

    const users = usersData.map((data) =>
      new UserBuilder()
        .withId(data.id)
        .withName(data.name)
        .withPassword(data.password)
        .withRole(data.role)
        .build(),
    );

    for (const user of users) {
      await userRepository.addUser(user);
    }

    const userFreelancer = await userRepository.getUserById('1');

    expect(userFreelancer.role).toBe(Role.FREELANCER);
  });

  it('should throw an error when not found', async () => {
    userRepository = new UserInMemory();

    const usersData = [
      { id: '1', name: 'Ali', password: 'pass123', role: Role.FREELANCER },
      { id: '2', name: 'Fatma', password: 'secret456', role: Role.FREELANCER },
      { id: '3', name: 'Mehdi', password: 'mehdi789', role: Role.FREELANCER },
      { id: '4', name: 'Salma', password: 'salmaClient', role: Role.CLIENT },
    ];

    const users = usersData.map((data) =>
      new UserBuilder()
        .withId(data.id)
        .withName(data.name)
        .withPassword(data.password)
        .withRole(data.role)
        .build(),
    );

    for (const user of users) {
      await userRepository.addUser(user);
    }

    await expect(userRepository.getUserById('11')).rejects.toThrow(
      UserNotFoundError,
    );
  });
});
