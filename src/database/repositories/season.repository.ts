import { Prisma, Season } from "@prisma/client";
import { ISeasonRepository } from "./interfaces/season-repository.interface";
import { prisma } from "../prisma/prisma-client";

export class SeasonRepository implements ISeasonRepository {
    async create(data: Prisma.SeasonCreateInput): Promise<Season> {
       return await prisma.season.create({ data });
    }
    async findById(id: string): Promise<Season | null> {
        return await prisma.season.findUnique({ where: { id }});
    }
    async findAll(): Promise<Season[]> {
        return await prisma.season.findMany();
    }
    async update(id: string, data: Prisma.SeasonUpdateInput): Promise<Season> {
        return await prisma.season.update({ where: { id }, data });
    }
    async delete(id: string): Promise<void> {
        await prisma.season.delete({ where: { id }});
    }
}