import { IUserRepository } from "../database/repositories/interfaces/user-repository.interface";
import { hashPassword } from "../utils/password";

export class UserService {
  constructor(private userRepository: IUserRepository) { }

  async createUser({ email, password, firstName, lastName, nickname }: { email: string, password: string, firstName: string, lastName: string, nickname: string }) {
    // Hash the password
    const hashedPassword = await hashPassword(password);

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