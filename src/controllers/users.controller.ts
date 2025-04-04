import { Response } from 'express';
import { UserService } from '../services/user.service';
import { UserRepository } from '../database/repositories/user.repository';
import { AuthenticatedRequest } from '../middleware/types/authenticated-request';

export async function createUser(req: AuthenticatedRequest, res: Response): Promise<Response> {
    try {
        // Initialize the user service
        const userService = new UserService(new UserRepository());

        // Get the body of the request
        const { email, password, firstName, lastName, nickname } = req.body;

        // Validate the body of the request
        if (!email || !password || !firstName || !lastName || !nickname) {
            return res.status(400).json({ message: 'All fields are required', fields: { email, password, firstName, lastName, nickname } });
        }

        // Create the user
        const user = await userService.createUser({ email, password, firstName, lastName, nickname });

        // Return the user
        return res.status(201).json({ id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, nickname: user.nickname });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error });
    }
}

export async function loginUser(req: AuthenticatedRequest, res: Response): Promise<Response> {
    try {
        // Initialize the user service
        const userService = new UserService(new UserRepository());

        // Get the body of the request
        const { email, password } = req.body;

        // Validate the body of the request
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required', fields: { email, password } });
        }

        // Login the user
        const { user, token } = await userService.loginUser({ email, password });

        // Return the user
        return res.status(200).json({ user, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error });
    }
}