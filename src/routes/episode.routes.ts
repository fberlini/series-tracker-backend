import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { createEpisode, deleteEpisode, getAllEpisodes, getEpisode, updateEpisode } from "../controllers/episode.controller";

const router = Router({ mergeParams: true });

router.post('', requireAuth, async (req, res) => { await createEpisode(req, res) });
router.get('', requireAuth, async (req, res) => { await getAllEpisodes(req, res) });
router.get('/:id', requireAuth, async (req, res) => { await getEpisode(req, res) });
router.put('/:id', requireAuth, async (req, res) => { await updateEpisode(req, res) });
router.delete('/:id', requireAuth, async (req, res) => { await deleteEpisode(req, res) });

export default router;