import { Prisma, Episode } from "@prisma/client";
import { IEpisodeRepository } from "./interfaces/episode-repository.interface";
import { prisma } from "../prisma/prisma-client";

export class EpisodeRepository implements IEpisodeRepository {
    async create(data: Prisma.EpisodeCreateInput): Promise<Episode> {
        return await prisma.episode.create({ data });
    }
    async findById(id: string): Promise<Episode | null> {
        return await prisma.episode.findUnique({ where: { id }});
    }
    async findAll(): Promise<Episode[]> {
        return await prisma.episode.findMany();
    }
    async findAllBySeason(seasonId: string): Promise<Episode[]> {
        return await prisma.episode.findMany({ where: { seasonId }});
    }
    async update(id: string, data: Prisma.EpisodeUpdateInput): Promise<Episode> {
        return await prisma.episode.update({ data, where: { id }});
    }
    async delete(id: string): Promise<void> {
        await prisma.episode.delete({ where: { id }});
    }
}