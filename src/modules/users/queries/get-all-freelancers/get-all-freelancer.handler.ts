import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { GetUsersQuery } from './get-all-freelancer.controller';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../database/user.entity';
import { Role } from '../../domain/User';

@Injectable()
@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}
  async execute(query: GetUsersQuery): Promise<UserEntity[]> {
    const { minRating, maxPrice, category, proximity } = query.filters;
    let qb = this.userRepo
      .createQueryBuilder('user')
      .where('user.role = :role', { role: Role.FREELANCER });

    if (minRating !== undefined) {
      qb = qb.andWhere('user.rating >= :minRating', { minRating });
    }
    if (maxPrice !== undefined) {
      qb = qb.andWhere('user.price <= :maxPrice', { maxPrice });
    }
    if (category) {
      qb = qb.andWhere('user.category = :category', { category });
    }
    return qb.getMany();
  }
}
