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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CqrsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'snei3i',
      password: 'snei3i',
      database: 'snei3i',
      entities: [UserEntity],
      synchronize: true,
    }),
    AuthModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [
    AppController,
    UserController,
    UserClientController,
    CreateUserFreelancerController,
  ],
  providers: [AppService, GetUsersHandler],
})
export class AppModule {}
