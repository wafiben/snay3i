import { UserAuthorization } from '../domain/errors/user-authorization.error';
import { UserNotFoundError } from '../domain/errors/user-not-found.error';
import { Role, UserModel } from '../domain/User';

interface FreelancerFilter {
  keyword?: string;
  minRating?: number;
  maxPrice?: number;
  category?: string;
  location?: string; // optional, stubbed
}

export class UserInMemory {
  private users: UserModel[] = [];

  addUser(user: UserModel): void {
    this.users.push(user);
  }

  async getUserById(userId: string): Promise<UserModel> {
    const found = this.users.find((cat) => cat.id === userId);
    if (!found) {
      throw new UserNotFoundError();
    }
    return found;
  }

  async isAdmin(userId: string): Promise<boolean> {
    return (await this.getUserById(userId)).role === Role.ADMIN;
  }

  async isClient(userId: string): Promise<boolean> {
    return (await this.getUserById(userId)).role === Role.CLIENT;
  }

  async getAllFreelancers(userId: string): Promise<UserModel[]> {
    if (await this.isClient(userId)) {
      return this.users.filter((user) => user.role === Role.FREELANCER);
    }

    throw new UserAuthorization();
  }

  async filterFreelancers (filters: FreelancerFilter): Promise<UserModel[]> {
    return this.users.filter((user) => {
      if (user.role !== Role.FREELANCER) return false;

      const keyword = filters.keyword?.toLowerCase();
      const category = filters.category?.toLowerCase();

      const ratingMatch =
        filters.minRating !== undefined
          ? (user.starRating ?? 0) >= filters.minRating
          : true;

      const categoryMatch = category
        ? (user.services?.some(
            (service) => service.name.toLowerCase() === category,
          ) ?? false)
        : true;

      const locationMatch = filters.location ? true : true;

      return ratingMatch && categoryMatch && locationMatch;
    });
  }
  
}
