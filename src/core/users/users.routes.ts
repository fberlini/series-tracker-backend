import { Router } from 'express';
import { createUser } from './users.controller';
import { requireAuth } from '../auth/middleware/auth';

const router = Router();

router.post('/register', async (req, res) => { await createUser(req, res) });
router.get('/me', requireAuth, async (req, res) => { res.status(200).json({ message: 'You are authenticated', userId: req.session.userId }) });

export default router;