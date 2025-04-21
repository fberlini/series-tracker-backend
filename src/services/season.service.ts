import { ISeasonRepository } from "../database/repositories/interfaces/season-repository.interface";

export class SeasonService {
    constructor(private readonly repository: ISeasonRepository) { }

    async createSeason({ userId, number, synopsis, seriesId, launchAt }: { userId: string, number: number, synopsis: string, seriesId: string, launchAt: Date }) {
        return await this.repository.create({ createdByUser: { connect: { id: userId } }, number: number, synopsis, series: { connect: { id: seriesId } }, launchAt });
    }

    async getAllSeasons(seriesId: string) {
        return await this.repository.findAllBySeries(seriesId);
    }

    async getSeasonById(id: string) {
        return await this.repository.findById(id);
    }

    async updateSeason(id: string, { number, synopsis, launchAt }: { number: number, synopsis: string, launchAt?: Date }) {
        return await this.repository.update(id, { number: number, synopsis, launchAt });
    }

    async deleteSeason(id: string) {
        return await this.repository.delete(id);
    }
}