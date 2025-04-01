import { Router } from 'express';
import { createUser } from '../controllers/users.controller';

const router = Router();

router.post('/register', async (req, res) => {
    await createUser(req, res)
});

export default router;