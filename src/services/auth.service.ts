import { IUserRepository } from "../database/repositories/interfaces/user-repository.interface";
import { comparePassword } from "../utils/password";

export class AuthService {
    constructor(private userRepository: IUserRepository) { }

    async loginUser({ email, password }: { email: string, password: string }) {
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

        // Return the user
        return { user };
    }
}