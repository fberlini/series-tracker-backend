import { ISeriesRepository } from "../database/repositories/interfaces/series-repository.interface";

export class SeriesService {
    constructor(private seriesRepository: ISeriesRepository) { }

    async createSeries({ title, userId, synopsis, launchAt }: { title: string, userId: string, synopsis: string, launchAt: Date }) {
        const date = launchAt.toISOString();
        return await this.seriesRepository.createSeries({ title, createdByUser: { connect: { id: userId } }, episodesCount: 0, seasonsCount: 0, synopsis, launchAt: date });
    }

    async getSeriesById(id: string) {
        return await this.seriesRepository.findSeriesById(id);
    }

    async updateSeries(id: string, { title, synopsis, launchAt }: { title: string, synopsis: string, launchAt: Date }) {
        const date = launchAt.toISOString();
        return await this.seriesRepository.updateSeries(id, { title, synopsis, launchAt: date });
    }

    async deleteSeries(id: string) {
        return await this.seriesRepository.deleteSeries(id);
    }
}
