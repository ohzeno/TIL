import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { JsonDB } from 'node-json-db';
import { CreateUserDto } from '../dtos/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

jest.mock('node-json-db');
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
});
