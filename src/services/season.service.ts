import { ISeasonRepository } from "../database/repositories/interfaces/season-repository.interface";

export class SeasonService {
    constructor(private readonly seasonRepository: ISeasonRepository) { }

    async createSeason({ userId, number, synopsis, seriesId, launchAt }: { userId: string, number: number, synopsis: string, seriesId: string, launchAt?: Date }) {
        return await this.seasonRepository.create({ createdByUser: { connect: { id: userId } }, number: number, synopsis, series: { connect: { id: seriesId } }, launchAt });
    }

    async getAllSeasons() {
        return await this.seasonRepository.findAll();
    }

    async getSeasonById(id: string) {
        return await this.seasonRepository.findById(id);
    }

    async updateSeason(id: string, { userId, number, synopsis, seriesId, launchAt }: { userId: string, number: number, synopsis: string, seriesId: string, launchAt?: Date }) {
        return await this.seasonRepository.update(id, { createdByUser: { connect: { id: userId } }, number: number, synopsis, series: { connect: { id: seriesId } }, launchAt });
    }

    async deleteSeries(id: string) {
        return await this.seasonRepository.delete(id);
    }
}