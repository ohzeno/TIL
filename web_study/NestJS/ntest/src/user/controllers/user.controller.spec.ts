import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';

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
});
