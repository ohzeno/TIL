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

  it('/users/:id (PATCH)', async () => {
    const createdUser = await userRepository.create({
      name: '홍길동',
      age: 30,
    });

    const updateData = {
      name: '홍길순',
      age: 31,
    };

    const response = await request(app.getHttpServer())
      .patch(`/users/${createdUser.id}`)
      .send(updateData)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: createdUser.id,
        ...updateData,
      }),
    );

    const updatedUser = await userRepository.findOne(createdUser.id);
    expect(updatedUser).toEqual(
      expect.objectContaining({
        id: createdUser.id,
        ...updateData,
      }),
    );
  });

  it('/users/:id (DELETE)', async () => {
    const createdUser = await userRepository.create({
      name: '홍길동',
      age: 30,
    });

    await request(app.getHttpServer())
      .delete(`/users/${createdUser.id}`)
      .expect(200);

    const deletedUser = await userRepository.findOne(createdUser.id);
    expect(deletedUser).toBeNull();

    const allUsers = await userRepository.findAll();
    expect(allUsers).not.toContainEqual(
      expect.objectContaining({ id: createdUser.id }),
    );
  });

  it('/users/search (GET)', async () => {
    await userRepository.create({ name: '홍길동', age: 30 });
    await userRepository.create({ name: '홍길순', age: 25 });
    await userRepository.create({ name: '김철수', age: 35 });
    await userRepository.create({ name: '이영희', age: 28 });

    const response1 = await request(app.getHttpServer())
      .get(`/users/search?query=${encodeURIComponent('홍')}`)
      .expect(200);

    expect(response1.body).toBeInstanceOf(Array);
    expect(response1.body).toHaveLength(2);
    expect(response1.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: '홍길동', age: 30 }),
        expect.objectContaining({ name: '홍길순', age: 25 }),
      ]),
    );

    const response2 = await request(app.getHttpServer())
      .get('/users/search?query=28')
      .expect(200);

    expect(response2.body).toBeInstanceOf(Array);
    expect(response2.body).toHaveLength(1);
    expect(response2.body[0]).toEqual(
      expect.objectContaining({ name: '이영희', age: 28 }),
    );

    const response3 = await request(app.getHttpServer())
      .get(`/users/search?query=${encodeURIComponent('없는사람')}`)
      .expect(200);

    expect(response3.body).toBeInstanceOf(Array);
    expect(response3.body).toHaveLength(0);
  });
});
