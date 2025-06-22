import { UserModel, Role, Service, AvailabilitySlot, PortfolioItem, Certificate, Review } from '../modules/users/domain/User';

export class UserBuilder {
  private id: string;
  private name: string;
  private email: string;
  private password: string;
  private role: Role = Role.CLIENT;
  private isVerified: boolean = false;
  private profilePhotoUrl?: string;

  private starRating?: number;
  private completedJobs?: number;
  private services?: Service[];
  private availability?: AvailabilitySlot[];
  private portfolio?: PortfolioItem[];
  private insuranceStatus?: string;
  private certificates?: Certificate[];
  private reviews?: Review[];
  private languagesSpoken?: string[];

  withId(id: string): this {
    this.id = id;
    return this;
  }

  withName(name: string): this {
    this.name = name;
    return this;
  }

  withEmail(email: string): this {
    this.email = email;
    return this;
  }

  withPassword(password: string): this {
    this.password = password;
    return this;
  }

  withRole(role: Role): this {
    this.role = role;
    return this;
  }

  withIsVerified(isVerified: boolean): this {
    this.isVerified = isVerified;
    return this;
  }

  withProfilePhoto(url: string): this {
    this.profilePhotoUrl = url;
    return this;
  }

  withStarRating(rating: number): this {
    this.starRating = rating;
    return this;
  }

  withCompletedJobs(count: number): this {
    this.completedJobs = count;
    return this;
  }

  withServices(services: Service[]): this {
    this.services = services;
    return this;
  }

  withAvailability(availability: AvailabilitySlot[]): this {
    this.availability = availability;
    return this;
  }

  withPortfolio(portfolio: PortfolioItem[]): this {
    this.portfolio = portfolio;
    return this;
  }

  withInsuranceStatus(status: string): this {
    this.insuranceStatus = status;
    return this;
  }

  withCertificates(certificates: Certificate[]): this {
    this.certificates = certificates;
    return this;
  }

  withReviews(reviews: Review[]): this {
    this.reviews = reviews;
    return this;
  }

  withLanguages(languages: string[]): this {
    this.languagesSpoken = languages;
    return this;
  }

  build(): UserModel {
    const user = new UserModel(
      this.id,
      this.name,
      this.email,
      this.password,
      this.role,
      this.isVerified,
      this.profilePhotoUrl
    );

    user.starRating = this.starRating;
    user.completedJobs = this.completedJobs;
    user.services = this.services;
    user.availability = this.availability;
    user.portfolio = this.portfolio;
    user.insuranceStatus = this.insuranceStatus;
    user.certificates = this.certificates;
    user.reviews = this.reviews;
    user.languagesSpoken = this.languagesSpoken;

    return user;
  }
}
