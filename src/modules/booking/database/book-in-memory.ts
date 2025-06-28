import { BookingRequest } from '../domain/booking-request';
import { BookingStatus } from '../domain/booking-request';

export class BookingInMemory {
  private bookings: BookingRequest[] = [];

  async createBooking(data: {
    clientId: string;
    freelancerId: string;
    serviceName: string;
    dateTime: Date;
  }): Promise<BookingRequest> {
    const booking: BookingRequest = {
      id: Date.now().toString(),
      status: BookingStatus.PENDING,
      ...data,
    };
    this.bookings.push(booking);
    return booking;
  }

  async getAllBookings(): Promise<BookingRequest[]> {
    return this.bookings;
  }
}
