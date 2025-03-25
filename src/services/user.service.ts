import { PrismaClient } from "@prisma/client";

export class UserService {
  constructor(private prisma: PrismaClient) {}

  async createUser(email: string, password: string) {
    try {
      // In a real app, you'd hash the password and store the user in a database
      return await this.prisma.user.create({
        data: {
        email,
        password,
        },
      });
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }
}