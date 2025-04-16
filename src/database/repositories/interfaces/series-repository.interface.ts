import { Prisma, Series } from "@prisma/client";

export interface ISeriesRepository {
    create(data: Prisma.SeriesCreateInput): Promise<Series>;
    findById(id: string): Promise<Series | null>;
    findAll(): Promise<Series[]>;
    update(id: string, data: Prisma.SeriesUpdateInput): Promise<Series>;
    delete(id: string): Promise<void>;
}

