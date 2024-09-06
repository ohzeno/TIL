import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { NotFoundException } from '@nestjs/common';

jest.mock('../services/user.service');

describe('UserController', () => {
  let controller: UserController;
  let userService: jest.Mocked<UserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should call userService.createUser with the given user data and return the result', async () => {
      const createUserDto: CreateUserDto = { name: 'Test User', age: 30 };
      const expectedUser: User = { id: '1', ...createUserDto };

      userService.createUser.mockResolvedValue(expectedUser);

      const result = await controller.createUser(createUserDto);

      expect(userService.createUser).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(expectedUser);
    });
  });

  describe('findAll', () => {
    it('should call userService.findAll and return the result when users exist', async () => {
      const expectedUsers: User[] = [
        { id: '1', name: 'User 1', age: 30 },
        { id: '2', name: 'User 2', age: 25 },
      ];

      userService.findAll.mockResolvedValue(expectedUsers);

      const result = await controller.findAll();

      expect(userService.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedUsers);
    });

    it('should call userService.findAll and return an empty array when no users exist', async () => {
      userService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(userService.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should call userService.findOne with the given id and return the result when user exists', async () => {
      const userId = '1';
      const expectedUser: User = { id: userId, name: 'Test User', age: 30 };

      userService.findOne.mockResolvedValue(expectedUser);

      const result = await controller.findOne(userId);

      expect(userService.findOne).toHaveBeenCalledWith(userId);
      expect(result).toEqual(expectedUser);
    });

    it('should call userService.findOne and throw NotFoundException when user does not exist', async () => {
      const userId = '999';

      userService.findOne.mockRejectedValue(
        new NotFoundException(`User with ID "${userId}" not found`),
      );

      await expect(controller.findOne(userId)).rejects.toThrow(
        NotFoundException,
      );
      expect(userService.findOne).toHaveBeenCalledWith(userId);
    });
  });

  describe('updateUser', () => {
    it('should call userService.updateUser with the given id and user data and return the result', async () => {
      const userId = '1';
      const updateUserDto = { name: 'Updated User', age: 35 };
      const expectedUser: User = { id: userId, ...updateUserDto };

      userService.updateUser.mockResolvedValue(expectedUser);

      const result = await controller.updateUser(userId, updateUserDto);

      expect(userService.updateUser).toHaveBeenCalledWith(
        userId,
        updateUserDto,
      );
      expect(result).toEqual(expectedUser);
    });

    it('should call userService.updateUser and throw NotFoundException when user does not exist', async () => {
      const userId = '999';
      const updateUserDto = { name: 'Updated User', age: 35 };

      userService.updateUser.mockRejectedValue(
        new NotFoundException(`User with ID "${userId}" not found`),
      );

      await expect(
        controller.updateUser(userId, updateUserDto),
      ).rejects.toThrow(NotFoundException);
      expect(userService.updateUser).toHaveBeenCalledWith(
        userId,
        updateUserDto,
      );
    });
  });
});
