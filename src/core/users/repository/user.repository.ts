import { Prisma, User } from "@prisma/client";
import { IUserRepository } from "./user-repository.interface";
import { prisma } from "../../../database/prisma/prisma-client";

export class UserRepository implements IUserRepository {
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return await prisma.user.create({ data });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  }

  async findUserById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } });
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return await prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}

