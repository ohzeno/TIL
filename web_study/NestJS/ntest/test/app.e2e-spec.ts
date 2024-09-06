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

  it('/users (GET)', async () => {
    const user1 = await userRepository.create({ name: '홍길동', age: 30 });
    const user2 = await userRepository.create({ name: '김철수', age: 25 });
    const user3 = await userRepository.create({ name: '이영희', age: 35 });

    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(3);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: user1.id, name: '홍길동', age: 30 }),
        expect.objectContaining({ id: user2.id, name: '김철수', age: 25 }),
        expect.objectContaining({ id: user3.id, name: '이영희', age: 35 }),
      ]),
    );
  });

  it('/users/:id (GET)', async () => {
    const createdUser = await userRepository.create({
      name: '홍길동',
      age: 30,
    });

    const response = await request(app.getHttpServer())
      .get(`/users/${createdUser.id}`)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: createdUser.id,
        name: '홍길동',
        age: 30,
      }),
    );
  });
});
