import { Controller, Get, Query, NotFoundException, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { UserModel } from '../../../users/domain/User';
import { SingleFrealancer, UserDto } from '../../../users/dto/user.dto';

export class GetUserByIdQuery {
  constructor(public readonly id: string) {}
}

@Controller('user-freelance')
export class GetUserControllerById {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('/single/:id')
  async getSingleUser(@Param('id') id: string): Promise<UserDto> {
    if (!id) {
      throw new NotFoundException('User ID must be provided');
    }

    const user: UserModel = await this.queryBus.execute(
      new GetUserByIdQuery(id),
    );

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return new SingleFrealancer(user);
  }
}