import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import { UserController } from './modules/users/queries/get-all-freelancers/get-all-freelancer.controller';
import { AppService } from './app.service';
import { GetUsersHandler } from './modules/users/queries/get-all-freelancers/get-all-freelancer.handler';
import { UserEntity } from './modules/users/database/user.entity';
import { UserClientController } from './modules/users/commands/create-user-client.controller';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CreateUserFreelancerController } from './modules/users/commands/create-user-freelancer.controller';
import { GetUserControllerById } from './modules/users/queries/get-single-frealancer/get-single-freelancer.controller';
import { GetUserByIdHandler } from './modules/users/queries/get-single-frealancer/get-single-freelancer.handler';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';

// Environment detection
const isTestEnvironment = process.env.NODE_ENV === 'test';
const isCIEnvironment = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';

@Module({
  imports: [
    // Always first: Config
    ConfigModule.forRoot({ isGlobal: true }),
    
    // Always provide cache - memory in CI/test, Redis in dev/prod
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        if (isCIEnvironment || isTestEnvironment) {
          // Use memory cache for CI and tests - no external dependencies
          return {
            store: 'memory',
            ttl: 60 * 5, // 5 minutes
            max: 100,    // limit memory usage
          };
        }
        
        // Use Redis for local development and production
        return {
          store: await redisStore({
            socket: {
              host: 'localhost',
              port: 6379,
            },
            ttl: 60 * 5,
          }),
        };
      },
    }),
    

    // CQRS and Database
    CqrsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: isCIEnvironment ? 5432 : (isTestEnvironment ? 5433 : 5432),
      username: 'snei3i',
      password: 'snei3i',
      database: isCIEnvironment ? 'snei3i' : (isTestEnvironment ? 'snei3i_test' : 'snei3i'),
      entities: [UserEntity],
      synchronize: true,
      dropSchema: isCIEnvironment || isTestEnvironment, // Always drop schema in CI/test for clean state
      logging: false, // Reduce noise in tests
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