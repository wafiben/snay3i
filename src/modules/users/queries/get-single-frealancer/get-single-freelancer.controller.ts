import {
  Controller,
  Get,
  Query,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { UserModel } from '../../../users/domain/User';

export class GetUserByIdQuery {
  constructor(public readonly id: number) {}
}

@Controller('user-freelance')
export class GetUserControllerById {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('/single/:id')
  async getSingleUser(@Param('id') id: string): Promise<any> {
    const numericId = parseInt(id, 10);
    if (!id) {
      throw new NotFoundException('User ID must be provided');
    }

    const user: UserModel = await this.queryBus.execute(
      new GetUserByIdQuery(numericId),
    );

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      services: user.services || [],
    };
  }
}
