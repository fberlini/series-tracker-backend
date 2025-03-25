import { Router } from 'express';
import { UserController } from '../controllers/users.controller';

const router = Router();

router.post('/register', async (req, res) => {
    await UserController.createUser(req, res)
});

export default router;