import { ISeriesRepository } from "../database/repositories/interfaces/series-repository.interface";

export class SeriesService {
    constructor(private seriesRepository: ISeriesRepository) { }

    async createSeries({ title, userId, synopsis, launchAt }: { title: string, userId: string, synopsis: string, launchAt: Date }) {
        const date = launchAt.toISOString();
        return await this.seriesRepository.create({ title, createdByUser: { connect: { id: userId } }, synopsis, launchAt: date });
    }

    async getSeriesById(id: string) {
        return await this.seriesRepository.findById(id);
    }

    async getAllSeries() {
        return await this.seriesRepository.findAll();
    }

    async updateSeries(id: string, { title, synopsis, launchAt }: { title: string, synopsis: string, launchAt: Date }) {
        const date = launchAt.toISOString();
        return await this.seriesRepository.update(id, { title, synopsis, launchAt: date });
    }

    async deleteSeries(id: string) {
        return await this.seriesRepository.delete(id);
    }
}
