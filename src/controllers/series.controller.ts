import { Request, Response } from 'express';
import { SeriesService } from '../services/series.service';
import { SeriesRepository } from '../database/repositories/series.repository';

export async function createSeries(req: Request, res: Response) {
    try {
        const { title, synopsis, launchAt } = req.body;
        const userId = req.session.userId;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!title || !synopsis || !launchAt) {
            return res.status(400).json({ message: 'All fields are required', fields: { title, synopsis, launchAt } });
        }

        const date = new Date(launchAt);
        const seriesService = new SeriesService(new SeriesRepository());
        const series = await seriesService.createSeries({ title, userId, synopsis, launchAt: date });

        return res.status(201).json(series);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error });
    }
}

export async function getSeriesById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const seriesService = new SeriesService(new SeriesRepository());
        const series = await seriesService.getSeriesById(id);

        return res.status(200).json(series);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error });
    }
}

export async function updateSeries(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { title, synopsis, launchAt } = req.body;

        if (!title || !synopsis || !launchAt) {
            return res.status(400).json({ message: 'All fields are required', fields: { title, synopsis, launchAt } });
        }

        const date = new Date(launchAt);
        const seriesService = new SeriesService(new SeriesRepository());
        const series = await seriesService.updateSeries(id, { title, synopsis, launchAt: date });

        return res.status(200).json(series);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error });
    }
}

export async function deleteSeries(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const seriesService = new SeriesService(new SeriesRepository());
        await seriesService.deleteSeries(id);

        return res.status(200).json({ message: 'Series deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error });
    }
}

