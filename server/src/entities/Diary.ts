import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";
import { getDiaryObjById } from "../services/DiarySevices";
import {
    generateTitle,
    generateTags,
    generateResponse,
} from "../Gemini/TitleGen";
const prisma = new PrismaClient();

const DEFAULT_LIMIT = 5;

export class Diary {
    id: string;
    content: string;
    tag: string;
    title: string;
    img: string;
    userId: string;
    aiResponse: string;

    constructor(diary: Diary) {
        this.id = uuidv4();
        this.content = diary.content;
        this.img = diary.img;
        this.tag = diary.tag;
        (this.title = diary.title),
            (this.userId = diary.userId),
            (this.aiResponse = diary.aiResponse);
    }

    static async addday(diary: Diary, userId: string): Promise<Diary | null> {
        try {
            const data = await prisma.diary.create({
                data: {
                    id: diary.id,
                    title: await generateTitle(diary.content),
                    tag: await generateTags(diary.content),
                    aiResponse: await generateResponse(diary.content),
                    content: diary.content,
                    img: diary.img,
                    userId: userId,
                },
            });
            return data;
        } catch (error: any) {
            console.log(error.message);
            return null;
        }
    }

    static async deleteDay(id: string): Promise<boolean> {
        try {
            console.group(id);
            if ((await getDiaryObjById(id)) !== null) {
                const data = await prisma.diary.delete({
                    where: {
                        id: id,
                    },
                });
                if (data !== null) return true;
                else return false;
            } else throw new Error("this day does not exist");
        } catch (error: any) {
            console.log(error.message);
            return false;
        }
    }

    static async getDay(id: string) {
        try {
            const data = await prisma.diary.findFirst({
                where: {
                    id: id,
                },
            });
            return data;
        } catch (error: any) {
            console.log(error.message);
            return null;
        }
    }

    static async getManyDays(userId: string, limit: number, offset: number) {
        try {
            const data = await prisma.diary.findMany({
                where: {
                    userId: userId,
                },
                take: limit,
                skip: offset,
                orderBy: { createdAt: "desc" },
            });
            return data;
        } catch (error: any) {
            console.log(error.message);
            return null;
        }
    }
}
