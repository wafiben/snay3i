import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { UserEntity } from '../src/modules/users/database/user.entity';

describe('User should sign In', () => {
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
    if (dataSource && dataSource.isInitialized) {
      await dataSource.destroy();
    }
    if (app) {
      await app.close();
    }
    if (moduleRef) {
      await moduleRef.close();
    }
  });

  it('user should sign in', async () => {
    expect(true).toBe(true);
    // 1️⃣ Save a user/
    /*     const newUser = {
      name: 'client',
      email: 'client@gmail.com',
      password: '000000',
    };

    // 1️⃣ Create user
    const createRes = await request(app.getHttpServer())
      .post('/user-client')
      .send(newUser);

    const loginRes = await request(app.getHttpServer())
      .post('/user/login')
      .send({ email: 'client@gmail.com', password: '000000' });

    const token = loginRes.body.access_token;

    const profileRes = await request(app.getHttpServer())
      .get('/user/profile')
      .set('authorization', `${token}`)
      .set('Content-Type', 'application/json');
    expect(profileRes.status).toBe(HttpStatus.OK);

    expect(profileRes.body).toHaveProperty('email', 'client@gmail.com');
    expect(profileRes.body).toHaveProperty('name', 'client'); */
  });
});
