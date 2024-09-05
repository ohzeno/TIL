import { Injectable } from '@nestjs/common';
import { JsonDB, Config } from 'node-json-db';
import { User } from '../user.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UserRepository {
  private db: JsonDB;

  constructor() {
    this.db = new JsonDB(new Config('myDatabase', true, false, '/'));
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = { ...createUserDto, id: uuidv4() };
    await this.db.push(`/users/${newUser.id}`, newUser);
    return newUser;
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.db.getData('/users');
      return Object.values(users);
    } catch (error) {
      if (error.message.includes("Can't find dataPath")) {
        return [];
      }
      throw error;
    }
  }

  async findOne(id: string): Promise<User | null> {
    try {
      return await this.db.getData(`/users/${id}`);
    } catch (error) {
      if (error.message.includes("Can't find dataPath")) {
        return null;
      }
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const existingUser = await this.findOne(id);
    if (!existingUser) return null;

    const updatedUser = { ...existingUser, ...updateUserDto };
    await this.db.push(`/users/${id}`, updatedUser);
    return updatedUser;
  }

  async delete(id: string): Promise<boolean> {
    try {
      const existingUser = await this.findOne(id);
      if (!existingUser) {
        return false;
      }
      await this.db.delete(`/users/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      throw error;
    }
  }

  async search(query: string): Promise<User[]> {
    try {
      const users = (await this.db.getData('/users')) as Record<string, User>;
      return Object.values(users).filter(
        (user: User) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.age.toString().includes(query),
      );
    } catch (error) {
      console.error('Error searching users:', error);
      return [];
    }
  }
}
