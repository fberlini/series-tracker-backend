import { Prisma, Series } from "@prisma/client";
import { ISeriesRepository } from "./interfaces/series-repository.interface";
import { prisma } from "../prisma/prisma-client";

export class SeriesRepository implements ISeriesRepository {
    async create(data: Prisma.SeriesCreateInput): Promise<Series> {
        return await prisma.series.create({ data });
    }

    async findById(id: string): Promise<Series | null> {
        return await prisma.series.findUnique({ where: { id } });
    }

    async findAll(): Promise<Series[]> {
        return await prisma.series.findMany();
    }

    async update(id: string, data: Prisma.SeriesUpdateInput): Promise<Series> {
        return await prisma.series.update({ where: { id }, data });
    }

    async delete(id: string): Promise<void> {
        await prisma.series.delete({ where: { id } });
    }
}

