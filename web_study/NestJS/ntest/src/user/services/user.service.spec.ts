import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

jest.mock('../repositories/user.repository');
jest.mock('uuid');

describe('UserService', () => {
  let service: UserService;
  let repository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(UserRepository) as jest.Mocked<UserRepository>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const mockUuid = 'mocked-uuid';
      jest.mocked(uuidv4).mockReturnValue(mockUuid);

      const createUserDto: CreateUserDto = { name: 'Test User', age: 30 };
      const createdUser = { id: mockUuid, ...createUserDto };

      repository.create.mockResolvedValue(createdUser);

      const result = await service.createUser(createUserDto);

      expect(repository.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(createdUser);
    });
  });
});
