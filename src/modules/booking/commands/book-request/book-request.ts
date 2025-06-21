import { UserInMemory } from "@modules/users/database/user-in-memory";
import { Role } from "@modules/users/domain/User";
import { UserBuilder } from "src/test-utils/user-builder";

describe('Booking Request', () => {
  let userRepository: UserInMemory;
  let bookingRepository: BookingInMemory;

  beforeEach(() => {
    userRepository = new UserInMemory();
    bookingRepository = new BookingInMemory();
  });

/*   it('should allow a client to create a booking request for a service', async () => {
    const client = new UserBuilder().withId('client1').withRole(Role.CLIENT).build();
    const freelancer = new UserBuilder()
      .withId('freelancer1')
      .withRole(Role.FREELANCER)
      .withServices([{ name: 'Painting', laborPrice: 100, estimatedMaterialCost: 40 }])
      .build();

    await userRepository.addUser(client);
    await userRepository.addUser(freelancer);

    const request = await bookingRepository.createBooking({
      clientId: client.id,
      freelancerId: freelancer.id,
      serviceName: 'Painting',
      dateTime: new Date('2025-06-30T10:00:00'),
    });

    expect(request.clientId).toBe(client.id);
    expect(request.freelancerId).toBe(freelancer.id);
    expect(request.serviceName).toBe('Painting');
    expect(request.status).toBe('PENDING');
  }); */

});
