import { Router } from 'express';
import { loginUser, logoutUser } from './auth.controller';
import { requireAuth } from './middleware/auth';

const router = Router();

router.post('/login', async (req, res) => { await loginUser(req, res) });
router.post('/logout', requireAuth, async (req, res) => { await logoutUser(req, res) });

export default router;