import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { createSeason, deleteSeason, getAllSeasons, getSeason, updateSeason } from "../controllers/season.controller";

const router = Router();

router.post('', requireAuth, async (req, res) => { await createSeason(req, res) });
router.get('', requireAuth, async (req, res) => { await getAllSeasons(req, res) });
router.get('/:id', requireAuth, async (req, res) => { await getSeason(req, res) });
router.put('/:id', requireAuth, async (req, res) => { await updateSeason(req, res) });
router.delete('/:id', requireAuth, async (req, res) => { await deleteSeason(req, res) });

export default router;