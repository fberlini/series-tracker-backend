import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { UserRepository } from '../database/repositories/user.repository';

export class UserController {
    private static userService = new UserService(new UserRepository());

    static async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password, firstName, lastName, nickname } = req.body;

            if (!email || !password || !firstName || !lastName || !nickname) {
                return res.status(400).json({ message: 'All fields are required', fields: { email, password, firstName, lastName, nickname } });
            }

            const user = await this.userService.createUser(email, password, firstName, lastName, nickname);

            return res.status(201).json({ id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, nickname: user.nickname });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error', error: error });
        }
    }
}