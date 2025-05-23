import { Prisma, User } from "@prisma/client";

export interface IUserRepository {
  createUser(data: Prisma.UserCreateInput): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserById(id: string): Promise<User | null>;
  updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
