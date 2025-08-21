import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../database/user.entity';
import { Role } from '../../domain/User';
import { GetUserByIdQuery } from './get-single-freelancer.controller';

@QueryHandler(GetUserByIdQuery)
@Injectable()
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async execute(query: GetUserByIdQuery): Promise<UserEntity | null> {
    const { id } = query;
    return this.userRepo.findOne({ where: { id } });
  }
}
