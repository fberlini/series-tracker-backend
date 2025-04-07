import { Router } from 'express';
import { createSeries, getSeriesById, updateSeries, deleteSeries } from '../controllers/series.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.post('/', requireAuth, async (req, res) => { await createSeries(req, res) });
router.get('/:id', requireAuth, async (req, res) => { await getSeriesById(req, res) });
router.put('/:id', requireAuth, async (req, res) => { await updateSeries(req, res) });
router.delete('/:id', requireAuth, async (req, res) => { await deleteSeries(req, res) });

export default router;