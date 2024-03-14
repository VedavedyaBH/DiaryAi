import { PrismaClient } from "@prisma/client";
import { Diary } from "../entities/Diary";
const prisma = new PrismaClient();

export async function getDiaryObjById(id: string): Promise<Diary | null> {
    try {
        const diary = await prisma.diary.findFirst({
            where: {
                id: id,
            },
        });

        if (!diary) {
            return null;
        }

        return diary;
    } catch (error: any) {
        return error;
    }
}
