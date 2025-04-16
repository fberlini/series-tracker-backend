import { Request, Response } from 'express';
import { SeasonService } from '../services/season.service';
import { SeasonRepository } from '../database/repositories/season.repository';

export async function createSeason(req: Request, res: Response) {
    try {
        const { number, synopsis, launchAt } = req.body;
        const { seriesId } = req.params;
        const userId = req.session.userId;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!number || !synopsis || !seriesId || !launchAt) {
            return res.status(400).json({ message: 'All fields are required: ', fields: { number, synopsis, seriesId, launchAt } });
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

export async function getAllSeasons(req: Request, res: Response) {
    try {
        const seasonService = new SeasonService(new SeasonRepository());
        const seasons = await seasonService.getAllSeasons();

        return res.status(200).json(seasons);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error });
    }
}

export async function getSeason(req: Request, res: Response) {
    try {
        const { id } = req.params

        const seasonService = new SeasonService(new SeasonRepository());
        const seasons = await seasonService.getSeasonById(id);

        return res.status(200).json(seasons);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error });
    }
}

export async function updateSeason(req: Request, res: Response) {
    try {
        const { number, synopsis, launchAt } = req.body;
        const { id } = req.params;

        if (!number || !synopsis || !launchAt) {
            return res.status(400).json({ message: 'All fields are required: ', fields: { number, synopsis, launchAt } });
        }

        const date = new Date(launchAt);
        const seasonService = new SeasonService(new SeasonRepository());
        const season = await seasonService.updateSeason(id, { number, synopsis, launchAt: date });

        return res.status(201).json(season);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error });
    }
}

export async function deleteSeason(req: Request, res: Response) {
    try {
        const { id } = req.params

        const seasonService = new SeasonService(new SeasonRepository());
        await seasonService.deleteSeason(id);

        return res.status(200).json({ message: 'Season deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error });
    }
}