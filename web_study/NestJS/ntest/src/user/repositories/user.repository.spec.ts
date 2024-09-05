import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { JsonDB, DataError } from 'node-json-db';
import { CreateUserDto } from '../dtos/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

jest.mock('node-json-db', () => {
  const actualModule = jest.requireActual('node-json-db');
  return {
    ...actualModule,
    JsonDB: jest.fn().mockImplementation(() => ({
      push: jest.fn(),
      getData: jest.fn(),
      delete: jest.fn(),
    })),
  };
});
jest.mock('uuid');

describe('UserRepository', () => {
  let repository: UserRepository;
  let jsonDBMock: jest.Mocked<JsonDB>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
    jsonDBMock = (repository as any).db;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should call JsonDB.push with the correct path and data, and return the created user', async () => {
      const mockUuid = 'mocked-uuid';
      jest.mocked(uuidv4).mockReturnValue(mockUuid);

      const createUserDto: CreateUserDto = { name: 'Test User', age: 30 };
      const expectedUser = { id: mockUuid, ...createUserDto };

      jsonDBMock.push.mockResolvedValue(undefined);

      const result = await repository.create(createUserDto);

      expect(jsonDBMock.push).toHaveBeenCalledWith(
        `/users/${mockUuid}`,
        expectedUser,
      );
      expect(result).toEqual(expectedUser);
    });
  });

  describe('findAll', () => {
    it('should call JsonDB.getData with the correct path and return all users when users exist', async () => {
      const mockUsers = {
        '1': { id: '1', name: 'User 1', age: 25 },
        '2': { id: '2', name: 'User 2', age: 30 },
      };
      jsonDBMock.getData.mockResolvedValue(mockUsers);

      const result = await repository.findAll();

      expect(jsonDBMock.getData).toHaveBeenCalledWith('/users');
      expect(result).toEqual(Object.values(mockUsers));
    });

    it('should call JsonDB.getData and return an empty array when no users exist', async () => {
      jsonDBMock.getData.mockRejectedValue(
        new DataError("Can't find dataPath: /users. Stopped at users", 5),
      );

      const result = await repository.findAll();

      expect(jsonDBMock.getData).toHaveBeenCalledWith('/users');
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should call JsonDB.getData with the correct path and return the user when found', async () => {
      const userId = '1';
      const mockUser = { id: userId, name: 'Test User', age: 30 };
      jsonDBMock.getData.mockResolvedValue(mockUser);

      const result = await repository.findOne(userId);

      expect(jsonDBMock.getData).toHaveBeenCalledWith(`/users/${userId}`);
      expect(result).toEqual(mockUser);
    });

    it('should return null when user is not found', async () => {
      const userId = '999';
      jsonDBMock.getData.mockRejectedValue(
        new DataError("Can't find dataPath: /users/999. Stopped at 999", 5),
      );

      const result = await repository.findOne(userId);

      expect(jsonDBMock.getData).toHaveBeenCalledWith(`/users/${userId}`);
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should call repository methods correctly and return the updated user when user exists', async () => {
      const userId = '1';
      const existingUser = { id: userId, name: 'Old Name', age: 25 };
      const updateUserDto = { name: 'New Name', age: 30 };
      const updatedUser = { ...existingUser, ...updateUserDto };

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(existingUser);
      jsonDBMock.push.mockResolvedValueOnce(undefined);

      const result = await repository.update(userId, updateUserDto);

      expect(repository.findOne).toHaveBeenCalledWith(userId);
      expect(jsonDBMock.push).toHaveBeenCalledWith(
        `/users/${userId}`,
        updatedUser,
      );
      expect(result).toEqual(updatedUser);
    });

    it('should return null when trying to update a non-existent user', async () => {
      const userId = '999';
      const updateUserDto = { name: 'New Name', age: 30 };

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      const result = await repository.update(userId, updateUserDto);

      expect(repository.findOne).toHaveBeenCalledWith(userId);
      expect(jsonDBMock.push).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });
});
