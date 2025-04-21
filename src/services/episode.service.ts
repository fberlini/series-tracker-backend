import { IEpisodeRepository } from "../database/repositories/interfaces/episode-repository.interface";

export class EpisodeService {
    constructor(private readonly repository: IEpisodeRepository) {}

    async createEpisode({ userId, episodeNumber, title, synopsis, seasonId, launchAt }: { userId: string, episodeNumber: number, title: string, synopsis: string, seasonId: string, launchAt: Date }) {
        return await this.repository.create({ episodeNumber, launchAt, title, synopsis, season: { connect: { id: seasonId } }, createdByUser: { connect: { id: userId }} });
    }

    async getAllEpisodes(seasonId: string) {
        return await this.repository.findAllBySeason(seasonId);
    }

    async getEpisodeById(id: string) {
        return await this.repository.findById(id);
    }

    async updateEpisode(id: string, { episodeNumber, title, synopsis, launchAt }: { episodeNumber: number, title: string, synopsis: string, launchAt: Date }) {
        return await this.repository.update(id, { episodeNumber, title, synopsis, launchAt });
    }

    async deleteEpisode(id: string) {
        return await this.repository.delete(id);
    }
}