import { IUserRepository } from "../database/repositories/interfaces/user-repository.interface";
import { comparePassword } from "../utils/password";
import { InvalidCredentialsError, UserNotFoundError } from "./error-extensions/auth-error.extensions";

export class AuthService {
    constructor(private userRepository: IUserRepository) { }

    async loginUser({ email, password }: { email: string, password: string }) {
        // Find the user
        const user = await this.userRepository.findUserByEmail(email);

        // Check if the user exists
        if (!user) {
            throw new UserNotFoundError();
        }

        // Check if the password is correct
        const isPasswordCorrect = await comparePassword(password, user.password);
        if (!isPasswordCorrect) {
            throw new InvalidCredentialsError();
        }

        // Return the user
        return { user };
    }
}