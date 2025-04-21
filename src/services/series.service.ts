import { ISeriesRepository } from "../database/repositories/interfaces/series-repository.interface";

export class SeriesService {
    constructor(private repository: ISeriesRepository) { }

    async createSeries({ title, userId, synopsis, launchAt }: { title: string, userId: string, synopsis: string, launchAt: Date }) {
        const date = launchAt.toISOString();
        return await this.repository.create({ title, createdByUser: { connect: { id: userId } }, synopsis, launchAt: date });
    }

    async getSeriesById(id: string) {
        return await this.repository.findById(id);
    }

    async getAllSeries() {
        return await this.repository.findAll();
    }

    async updateSeries(id: string, { title, synopsis, launchAt }: { title: string, synopsis: string, launchAt: Date }) {
        const date = launchAt.toISOString();
        return await this.repository.update(id, { title, synopsis, launchAt: date });
    }

    async deleteSeries(id: string) {
        return await this.repository.delete(id);
    }
}
