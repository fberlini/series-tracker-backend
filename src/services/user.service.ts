import { IUserRepository } from "../database/repositories/interfaces/user-repository.interface";
import bcrypt from 'bcrypt';

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser({ email, password, firstName, lastName, nickname }:{ email: string, password: string, firstName: string, lastName: string, nickname: string }) {
    // Hash the password
    const salt = await bcrypt.genSalt(new Date().getTime());
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    return await this.userRepository.createUser({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        nickname,
    });
  }
}