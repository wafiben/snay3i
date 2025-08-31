import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { UserEntity } from '../src/modules/users/database/user.entity';

describe('UserFreelancer e2e', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule], // full app
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    dataSource = app.get(DataSource); // get TypeORM DataSource
  });

  afterAll(async () => {
    await dataSource.destroy(); // close DB connection
    await app.close();
  });

  it('should save 2000 freelancer users', async () => {
    for (let i = 0; i <= 3000; i++) {
      const newUser = {
        name: `User${i}`,
        email: `user${i}@gmail.com`,
        password: '000000',
        services: [],
      };

      const createRes = await request(app.getHttpServer())
        .post('/user-freelancer')
        .send(newUser);

      expect(createRes.status).toBe(HttpStatus.CREATED);
    }
    expect(true).toBe(true);
  }, 100000);
});
