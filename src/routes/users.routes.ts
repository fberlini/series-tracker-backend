import { Router } from 'express';
import { UserController } from '../controllers/users.controller';

const router = Router();

router.post('/register', (req, res) => {
    UserController.createUser(req, res)
});

export default router;