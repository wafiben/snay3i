import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { UserEntity } from '../src/modules/users/database/user.entity';

describe('get single with type Freelancer', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let id: number | null;

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

  afterEach(async () => {
    await dataSource.getRepository(UserEntity).clear();
  });

  it('should save a single user freelancer', async () => {
    // 1️⃣ Save a user
    const newUser = {
      name: 'Ali',
      email: 'ali@gmail.com',
      password: '000000',
      services: [],
    };

    // 1️⃣ Create user
    const createRes = await request(app.getHttpServer())
      .post('/user-freelancer')
      .send(newUser);

    expect(createRes.status).toBe(HttpStatus.CREATED);
    id = createRes?.body?.id; // this should be the generated ID
    expect(id).toBeDefined();

    // 2️⃣ Fetch the user from database via GET endpoint
    const getRes = await request(app.getHttpServer()).get(
      `/user-freelance/single/${id}`,
    );

    expect(getRes.status).toBe(200);
    expect(getRes.body.name).toBe('Ali');
    expect(getRes.body.role).toBe('FREELANCER');
  });

  it('should throw an error when user not found', async () => {
    const id = 3;
    const getRes = await request(app.getHttpServer()).get(
      `/user-freelance/single/${id}`,
    );
    expect(getRes.status).toBe(404);
  });
});
