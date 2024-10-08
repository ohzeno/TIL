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
    it('should call repository.create with the given user data and return the result', async () => {
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
    it('should call repository.findAll and return the result', async () => {
      const mockUsers = [
        { id: '1', name: 'User 1', age: 25 },
        { id: '2', name: 'User 2', age: 30 },
      ];

      repository.findAll.mockResolvedValue(mockUsers);

      const result = await service.findAll();

      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });

    it('should return an empty array if repository.findAll returns an empty array', async () => {
      repository.findAll.mockResolvedValue([]);

      const result = await service.findAll();

      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should call repository.findOne with the given id and return the result', async () => {
      const mockUser = { id: '1', name: 'Test User', age: 30 };
      repository.findOne.mockResolvedValue(mockUser);

      const result = await service.findOne('1');

      expect(repository.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if repository.findOne returns null', async () => {
      const id = '1';
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow(
        new NotFoundException(`User with ID "${id}" not found`),
      );
      expect(repository.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('updateUser', () => {
    it('should call repository.update with the given id and user data and return the result', async () => {
      const id = '1';
      const updateUserDto = { name: 'Updated User', age: 35 };
      const updatedUser = { id, ...updateUserDto };

      repository.update.mockResolvedValue(updatedUser);

      const result = await service.updateUser(id, updateUserDto);

      expect(repository.update).toHaveBeenCalledWith(id, updateUserDto);
      expect(result).toEqual(updatedUser);
    });

    it('should throw NotFoundException if repository.update returns null', async () => {
      const id = '1';
      const updateUserDto = { name: 'Updated User', age: 35 };

      repository.update.mockResolvedValue(null);

      await expect(service.updateUser(id, updateUserDto)).rejects.toThrow(
        new NotFoundException(`User with ID "${id}" not found`),
      );
      expect(repository.update).toHaveBeenCalledWith(id, updateUserDto);
    });
  });

  describe('deleteUser', () => {
    it('should call repository.delete with the given id and return true if successful', async () => {
      const id = '1';
      repository.delete.mockResolvedValue(true);

      const result = await service.deleteUser(id);

      expect(repository.delete).toHaveBeenCalledWith(id);
      expect(result).toBe(true);
    });

    it('should throw NotFoundException if repository.delete returns false', async () => {
      const id = '1';
      repository.delete.mockResolvedValue(false);

      await expect(service.deleteUser(id)).rejects.toThrow(
        new NotFoundException(`User with ID "${id}" not found`),
      );
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('searchUsers', () => {
    it('should call repository.search with the given query and return the result', async () => {
      const query = 'test';
      const mockUsers = [
        { id: '1', name: 'Test User 1', age: 25 },
        { id: '2', name: 'Test User 2', age: 30 },
      ];

      repository.search.mockResolvedValue(mockUsers);

      const result = await service.searchUsers(query);

      expect(repository.search).toHaveBeenCalledWith(query);
      expect(result).toEqual(mockUsers);
    });

    it('should return an empty array if no users match the search query', async () => {
      const query = 'nonexistent';
      repository.search.mockResolvedValue([]);

      const result = await service.searchUsers(query);

      expect(repository.search).toHaveBeenCalledWith(query);
      expect(result).toEqual([]);
    });
  });
});
