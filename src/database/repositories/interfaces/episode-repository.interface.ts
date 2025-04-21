import { Prisma, Episode } from "@prisma/client";

export interface IEpisodeRepository {
    create(data: Prisma.EpisodeCreateInput): Promise<Episode>;
    findById(id: string): Promise<Episode | null>;
    findAll(): Promise<Episode[]>;
    findAllBySeason(seriesId: string): Promise<Episode[]>;
    update(id: string, data: Prisma.EpisodeUpdateInput): Promise<Episode>;
    delete(id: string): Promise<void>;
}