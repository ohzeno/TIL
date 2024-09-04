import { Injectable } from '@nestjs/common';
import { JsonDB, Config } from 'node-json-db';
import { User } from '../user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserRepository {
  private db: JsonDB;

  constructor() {
    this.db = new JsonDB(new Config('myDatabase', true, false, '/'));
  }

  async create(user: User): Promise<User> {
    const newUser = { ...user, id: uuidv4() };
    await this.db.push(`/users/${newUser.id}`, newUser);
    return newUser;
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.db.getData('/users');
      return Object.values(users);
    } catch (error) {
      return [];
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

  async update(id: string, user: Partial<User>): Promise<User | null> {
    const existingUser = await this.findOne(id);
    if (!existingUser) return null;

    const updatedUser = { ...existingUser, ...user };
    await this.db.push(`/users/${id}`, updatedUser);
    return updatedUser;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.db.delete(`/users/${id}`);
      return true;
    } catch (error) {
      if (error.message.includes("Can't find dataPath")) {
        return false;
      }
      throw error;
    }
  }
}
