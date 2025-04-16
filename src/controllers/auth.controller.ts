import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { UserRepository } from '../database/repositories/user.repository';
import { InvalidCredentialsError, UserNotFoundError } from '../services/error-extensions/auth-error.extensions';

export async function loginUser(req: Request, res: Response) {
    try {
        // Initialize the user service
        const authService = new AuthService(new UserRepository());

        // Get the body of the request
        const { email, password } = req.body;

        // Validate the body of the request
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required', fields: { email, password } });
        }

        // Login the user
        const { user } = await authService.loginUser({ email, password });

        // Set the session
        req.session.userId = user.id;

        // Return the user
        return res.status(200).json({ user });
    } catch (error) {
        console.error(error);

        if(error instanceof UserNotFoundError || error instanceof InvalidCredentialsError) {
            return res.status(401).json({ message: 'Invalid email or password'})
        }

        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function logoutUser(req: Request, res: Response) {
    try {
        req.session.destroy((error) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal server error', error: error });
            }

            res.clearCookie('connect.sid');
            return res.status(200).json({ message: 'Logged out successfully' });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}