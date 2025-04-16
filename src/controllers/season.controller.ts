import { Request, Response } from 'express';
import { SeasonService } from '../services/season.service';
import { SeasonRepository } from '../database/repositories/season.repository';

export async function createSeason(req: Request, res: Response) {
    try {
        const { number, synopsis, seriesId, launchAt } = req.body;
        const userId = req.session.userId;

        if(!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if(!number || !synopsis || !seriesId || !launchAt) {
            return res.status(400).json({ message: 'All fields are required: ', fields: { number, synopsis, seriesId, launchAt }});
        }

        const date = new Date(launchAt);
        const seasonService = new SeasonService(new SeasonRepository());
        const season = await seasonService.createSeason({ userId, number, synopsis, seriesId, launchAt: date });

        return res.status(201).json(season);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error });
    }
}