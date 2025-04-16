import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { createSeason } from "../controllers/season.controller";

const router = Router();

router.post('', requireAuth, async (req, res) => { await createSeason(req, res) });

export default router;