import { IUserRepository } from "../database/repositories/interfaces/user-repository.interface";
import bcrypt from 'bcrypt';

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(email: string, password: string, firstName: string, lastName: string, nickname: string) {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.userRepository.createUser({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        nickname,
    });
  }
}