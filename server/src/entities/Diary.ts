import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";
import { getDiaryObjById } from "../services/DiarySevices";
const prisma = new PrismaClient();

export class Diary {
    id: string;
    content: string;
    img: string;
    userId: string;

    constructor(diary: Diary) {
        this.id = uuidv4();
        this.content = diary.content;
        this.img = diary.img;
        this.userId = diary.userId;
    }

    static async addday(diary: Diary, userId: string): Promise<Diary | null> {
        try {
            const data = await prisma.diary.create({
                data: {
                    id: diary.id,
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

    static async getManyDays(userId: string) {
        try {
            const data = await prisma.diary.findMany({
                where: {
                    userId: userId,
                },
            });
            return data;
        } catch (error: any) {
            console.log(error.message);
            return null;
        }
    }
}
