import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { UserEntity } from '../src/modules/users/database/user.entity';

describe('get single with type Freelancer', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let id: number | null;
   let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    dataSource = moduleRef.get(DataSource);
  }, 30000);

  afterEach(async () => {
    if (dataSource && dataSource.isInitialized) {
      await dataSource.getRepository(UserEntity).clear();
    }
  });

  afterAll(async () => {
    // Close in the correct order
    if (dataSource && dataSource.isInitialized) {
      await dataSource.destroy();
    }
    if (app) {
      await app.close();
    }
    // Close the testing module
    if (moduleRef) {
      await moduleRef.close();
    }
  });

  it('should save a single user freelancer', async () => {
    const newUser = {
      name: 'Ali',
      email: 'ali@gmail.com',
      password: '000000',
      services: [],
    };

    const createRes = await request(app.getHttpServer())
      .post('/user-freelancer')
      .send(newUser);

    expect(createRes.status).toBe(HttpStatus.CREATED);
    id = createRes?.body?.id;
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
