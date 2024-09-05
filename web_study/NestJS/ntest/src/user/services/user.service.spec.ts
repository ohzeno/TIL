import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '../repositories/user.repository';
import { NotFoundException } from '@nestjs/common';
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

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const mockUsers = [
        { id: '1', name: 'User 1', age: 25 },
        { id: '2', name: 'User 2', age: 30 },
      ];

      repository.findAll.mockResolvedValue(mockUsers);

      const result = await service.findAll();

      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });

    it('should return an empty array if no users found', async () => {
      repository.findAll.mockResolvedValue([]);

      const result = await service.findAll();

      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      const mockUser = { id: '1', name: 'Test User', age: 30 };
      repository.findOne.mockResolvedValue(mockUser);

      const result = await service.findOne('1');

      expect(repository.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException with proper message if user is not found', async () => {
      const id = '1';
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow(
        new NotFoundException(`User with ID "${id}" not found`),
      );
      expect(repository.findOne).toHaveBeenCalledWith(id);
    });
  });
});
