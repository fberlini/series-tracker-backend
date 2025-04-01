import { Router, Response } from 'express';
import { createUser, loginUser } from '../controllers/users.controller';
import { protect } from '../middleware/auth';
import { AuthenticatedRequest } from '../middleware/types/authenticated-request';
const router = Router();

router.post('/register', async (req, res) => { await createUser(req, res) });
router.post('/login', async (req, res) => { await loginUser(req, res) });
router.get('/me', protect, async (req: AuthenticatedRequest, res: Response) => { res.status(200).json({ message: 'You are authenticated', userId: req.userId }) });

export default router;