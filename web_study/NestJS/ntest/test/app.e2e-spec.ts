import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UserRepository } from '../src/user/repositories/user.repository';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userRepository = moduleFixture.get<UserRepository>(UserRepository);
    await userRepository.deleteAll();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/users (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send({ name: '홍길동', age: 30 })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('홍길동');
    expect(response.body.age).toBe(30);

    const createdUser = await userRepository.findOne(response.body.id);
    expect(createdUser).toBeDefined();
    expect(createdUser).toEqual(response.body);

    const allUsers = await userRepository.findAll();
    expect(allUsers).toHaveLength(1);
  });
});
