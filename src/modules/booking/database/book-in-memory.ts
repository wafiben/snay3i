class BookingInMemory {
  private bookings: BookingRequest[] = [];

  async createBooking(data: {
    clientId: string;
    freelancerId: string;
    serviceName: string;
    dateTime: Date;
  }): Promise<BookingRequest> {
    const booking: BookingRequest = {
      id: Date.now().toString(),
      status: 'PENDING',
      ...data,
    };
    this.bookings.push(booking);
    return booking;
  }

  async getAllBookings(): Promise<BookingRequest[]> {
    return this.bookings;
  }
}