import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { GetUsersQuery } from './get-all-freelancer.controller';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../database/user.entity';
import { Role } from '../../domain/User';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,

    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}
  async execute(query: GetUsersQuery): Promise<UserEntity[]> {
    const cacheKey = `freelancers:${JSON.stringify(query.filters)}`;
    const cached = await this.cacheManager.get<UserEntity[]>(cacheKey);

    if (cached) {
      console.log('here')
      return cached;
    }

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

    const users = await qb.getMany();
    await this.cacheManager.set(cacheKey, users, 1000 * 60 * 5);
    return users;
  }
}
