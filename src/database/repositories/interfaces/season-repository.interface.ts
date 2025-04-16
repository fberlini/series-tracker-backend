import { Prisma, Season } from "@prisma/client";

export interface ISeasonRepository {
    create(data: Prisma.SeasonCreateInput): Promise<Season>;
    findById(id: string): Promise<Season | null>;
    findAll(): Promise<Season[]>;
    update(id: string, data: Prisma.SeasonUpdateInput): Promise<Season>;
    delete(id: string): Promise<void>;
}