import { Request, Response } from 'express';
import { EpisodeService } from './episode.service';
import { EpisodeRepository } from './repository/episode.repository';

export async function createEpisode(req: Request, res: Response) {
    try {
        const { episodeNumber, title, synopsis, launchAt } = req.body;
        const { seasonId } = req.params;
        const userId = req.session.userId;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!episodeNumber || !title || !synopsis || !seasonId || !launchAt) {
            return res.status(400).json({ message: 'All fields are required: ', fields: { episodeNumber, title, synopsis, seasonId, launchAt } });
        }

        const date = new Date(launchAt);
        const episodeService = new EpisodeService(new EpisodeRepository());
        const episode = await episodeService.createEpisode({ userId, episodeNumber, title, synopsis, seasonId, launchAt: date });

        return res.status(201).json(episode);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error });
    }
}

export async function getAllEpisodes(req: Request, res: Response) {
    try {
        const { episodeId } = req.params
        const episodeService = new EpisodeService(new EpisodeRepository());
        const episodes = await episodeService.getAllEpisodes(episodeId);

        return res.status(200).json(episodes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error });
    }
}

export async function getEpisode(req: Request, res: Response) {
    try {
        const { id } = req.params

        const episodeService = new EpisodeService(new EpisodeRepository());
        const episode = await episodeService.getEpisodeById(id);

        return res.status(200).json(episode);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error });
    }
}

export async function updateEpisode(req: Request, res: Response) {
    try {
        const { episodeNumber, title, synopsis, launchAt } = req.body;
        const { id } = req.params;

        if (!episodeNumber || !title || !synopsis || !launchAt) {
            return res.status(400).json({ message: 'All fields are required: ', fields: { episodeNumber, title, synopsis, launchAt } });
        }

        const date = new Date(launchAt);
        const episodeService = new EpisodeService(new EpisodeRepository());
        const episode = await episodeService.updateEpisode(id, { episodeNumber, title, synopsis, launchAt: date });

        return res.status(201).json(episode);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error });
    }
}

export async function deleteEpisode(req: Request, res: Response) {
    try {
        const { id } = req.params

        const episodeService = new EpisodeService(new EpisodeRepository());
        await episodeService.deleteEpisode(id);

        return res.status(200).json({ message: 'Episode deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error });
    }
}