import { UserModel } from '../../../users/domain/User';
import { UserDto } from '../../../users/dto/user.dto';
import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

export interface FreelancerFilter {
  minRating?: number;
  maxPrice?: number;
  category?: string;
  proximity?: number;
}

export class GetUsersQuery {
  constructor(public readonly filters: FreelancerFilter) {}
}

@Controller('users')
export class UserController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async getAllUsers(@Query() filters: FreelancerFilter): Promise<UserDto[]> {
    const users: UserModel[] = await this.queryBus.execute(
      new GetUsersQuery(filters),
    );
    return users.map((user) => new UserDto(user));
  }
}
