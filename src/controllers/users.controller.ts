import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { PrismaClient } from '@prisma/client';

export class UserController {
    private static userService = new UserService(new PrismaClient());

    static async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }

            const user = await this.userService.createUser(email, password);

            return res.status(201).json({ user });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}