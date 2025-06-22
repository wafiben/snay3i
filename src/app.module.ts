import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { AppController } from './app.controller';
import { UserController } from './modules/users/queries/get-all-freelancers/get-all-freelancer.controller';
import { AppService } from './app.service';
import { GetUsersHandler } from './modules/users/queries/get-all-freelancers/get-all-freelancer.handler';
import { UserModel } from './modules/users/domain/User';
import { UserEntity } from './modules/users/database/user.entity';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your_username',
      password: 'your_password',
      database: 'your_db',
      entities: [UserModel],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, GetUsersHandler],
})
export class AppModule {}
