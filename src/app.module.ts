import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserController } from './modules/users/queries/get-all-freelancers/get-all-freelancer.controller';
import { GetUsersHandler } from './modules/users/queries/get-all-freelancers/get-all-freelancer.handler';
import { UserEntity } from './modules/users/database/user.entity';
import { UserClientController } from './modules/users/commands/create-user-client.controller';
import { CreateUserFreelancerController } from './modules/users/commands/create-user-freelancer.controller';
import { GetUserControllerById } from './modules/users/queries/get-single-frealancer/get-single-freelancer.controller';
import { GetUserByIdHandler } from './modules/users/queries/get-single-frealancer/get-single-freelancer.handler';
import { AuthModule } from './modules/auth/auth.module';

// Detect environment
const isTestEnvironment = process.env.NODE_ENV === 'test';
const isCIEnvironment = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';

@Module({
  imports: [
    // Config globally
    ConfigModule.forRoot({ isGlobal: true }),

    // Cache module with Redis or memory
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        if (isCIEnvironment || isTestEnvironment) {
          return {
            store: 'memory',
            ttl: 300, // 5 minutes
            max: 100,
          };
        }

        return {
          store: await redisStore({
            socket: {
              host: 'localhost',
              port: 6380, // <-- updated to match your Docker Redis container
            },
            ttl: 300,
          }),
        };
      },
    }),

    // CQRS module
    CqrsModule,

    // TypeORM Postgres connection
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'snei3i',
      password: 'snei3i',
      database: 'snei3i_test',
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    }),
    TypeOrmModule.forFeature([UserEntity]),

    // Feature modules
    AuthModule,
  ],

  controllers: [
    AppController,
    UserController,
    UserClientController,
    CreateUserFreelancerController,
    GetUserControllerById,
  ],

  providers: [AppService, GetUsersHandler, GetUserByIdHandler],
})
export class AppModule {}
