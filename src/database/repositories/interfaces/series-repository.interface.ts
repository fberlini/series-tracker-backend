import { Prisma, Series } from "@prisma/client";

export interface ISeriesRepository {
    createSeries(data: Prisma.SeriesCreateInput): Promise<Series>;
    findSeriesById(id: string): Promise<Series | null>;
    updateSeries(id: string, data: Prisma.SeriesUpdateInput): Promise<Series>;
    deleteSeries(id: string): Promise<void>;
}

