export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  DECLINED = 'DECLINED',
}

class BookingRequest {
  id: string;
  clientId: string;
  freelancerId: string;
  serviceName: string;
  dateTime: Date;
  status: BookingStatus;

  constructor(
    id: string,
    clientId: string,
    freelancerId: string,
    serviceName: string,
    dateTime: Date,
    status: BookingStatus,
  ) {
    this.id = id;
    this.clientId = clientId;
    this.freelancerId = freelancerId;
    this.serviceName = serviceName;
    this.dateTime = dateTime;
    this.status = status;
  }
}
