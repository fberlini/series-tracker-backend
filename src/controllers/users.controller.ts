import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
    private static userService = new UserService();

    static createUser(req: Request, res: Response): Response {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = this.userService.createUser(email, password);

        return res.status(201).json({ user });
    }
}