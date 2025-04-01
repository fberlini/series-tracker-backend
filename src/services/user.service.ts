import { IUserRepository } from "../database/repositories/interfaces/user-repository.interface";
import { comparePassword, hashPassword } from "../utils/password";
import { generateToken } from "../utils/jwt";
export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser({ email, password, firstName, lastName, nickname }:{ email: string, password: string, firstName: string, lastName: string, nickname: string }) {
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

  async loginUser({ email, password }:{ email: string, password: string }) {
    // Find the user
    const user = await this.userRepository.findUserByEmail(email);

    // Check if the user exists
    if (!user) {
      throw new Error('User not found');
    }

    // Check if the password is correct
    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error('Invalid password');
    }

    const token = generateToken(user.id);

    // Return the user
    return { user, token };
  }
}