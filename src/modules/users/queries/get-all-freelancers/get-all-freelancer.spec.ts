import { UserInMemory } from '../../../users/database/user-in-memory';
import { UserBuilder } from '../../../../test-utils/user-builder';
import { Role } from '../../domain/User';
import { UserAuthorization } from '../../../users/domain/errors/user-authorization.error';

describe('Get users', () => {
  let userRepository: UserInMemory;
  UserInMemory;

  beforeEach(async () => {
    userRepository = new UserInMemory();
  });

  it('client should get all freelancer', async () => {
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

    const userClient = await userRepository.getUserById('4');

    const freelancers = await userRepository.getAllFreelancers('4');

    expect(userClient.role).toBe(Role.CLIENT);

    expect(freelancers.length).toBe(3);
  });

  it('should throw an error if non client role trye to see the freelancers', async () => {
    userRepository = new UserInMemory();

    const usersData = [
      { id: '1', name: 'Ali', password: 'pass123', role: Role.FREELANCER },
      { id: '2', name: 'Fatma', password: 'secret456', role: Role.FREELANCER },
      { id: '3', name: 'Mehdi', password: 'mehdi789', role: Role.FREELANCER },
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

    await expect(userRepository.getAllFreelancers('1')).rejects.toThrow(
      UserAuthorization,
    );
  });

  it('should filter freelancers based on rating and category', async () => {
    const userRepository = new UserInMemory();

    const usersData = [
      {
        id: '1',
        name: 'Ali Plumbing Expert',
        password: 'pass123',
        role: Role.FREELANCER,
        starRating: 4.5,
        services: [
          { name: 'Plumbing', laborPrice: 80, estimatedMaterialCost: 30 },
        ],
      },
      {
        id: '2',
        name: 'Fatma Painter',
        password: 'secret456',
        role: Role.FREELANCER,
        starRating: 3.0,
        services: [
          { name: 'Painting', laborPrice: 100, estimatedMaterialCost: 40 },
        ],
      },
      {
        id: '3',
        name: 'Mehdi Handyman',
        password: 'mehdi789',
        role: Role.FREELANCER,
        starRating: 4.9,
        services: [
          { name: 'Plumbing', laborPrice: 50, estimatedMaterialCost: 20 },
        ],
      },
      {
        id: '4',
        name: 'Client User',
        password: 'clientpass',
        role: Role.CLIENT,
      },
    ];

    const users = usersData.map((data) => {
      const builder = new UserBuilder()
        .withId(data.id)
        .withName(data.name)
        .withPassword(data.password)
        .withRole(data.role);

      if (data.starRating !== undefined) {
        builder.withStarRating(data.starRating);
      }

      if (data.services !== undefined) {
        builder.withServices(data.services);
      }

      return builder.build();
    });

    for (const user of users) {
      await userRepository.addUser(user);
    }

    const filters = {
      minRating: 4.0,
      category: 'Plumbing',
      location: 'anywhere',
    };

    const result = await userRepository.filterFreelancers(filters);

    expect(result).toHaveLength(2);
    expect(result.map((u) => u.name)).toEqual(
      expect.arrayContaining(['Ali Plumbing Expert', 'Mehdi Handyman']),
    );
  });
});
