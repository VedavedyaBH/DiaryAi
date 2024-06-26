import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";
import { getDiaryObjById } from "../services/DiarySevices";
import {
    generateTitle,
    generateTags,
    generateResponse,
} from "../gemini/TitleGen";
import { Socials } from "./Socials";
import { getUserObjById } from "../services/UserServices";

const prisma = new PrismaClient();
const today = new Date();

export class Diary {
    id: string;
    content: string;
    tag: string;
    title: string;
    img: string;
    userId: string;
    aiResponse: string;
    private: boolean;

    constructor(diary: Diary) {
        this.id = uuidv4();
        this.content = diary.content;
        this.img = diary.img;
        this.tag = diary.tag;
        (this.title = diary.title),
            (this.userId = diary.userId),
            (this.aiResponse = diary.aiResponse),
            (this.private = true);
    }

    static async addday(
        diary: Diary,
        userId: string,
        priavatePost: boolean
    ): Promise<Diary | null> {
        try {
            const today = new Date();

            const startOfDay = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate()
            );
            const endOfDay = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() + 1
            );

            const exists = await prisma.diary.findFirst({
                where: {
                    createdAt: {
                        gte: startOfDay,
                        lt: endOfDay,
                    },
                    userId: userId,
                },
            });

            if (exists) {
                throw new Error(
                    "A diary entry has already been added for today."
                );
            } else {
                const data = await prisma.diary.create({
                    data: {
                        id: diary.id,
                        title: await generateTitle(diary.content),
                        tag: await generateTags(diary.content),
                        aiResponse: await generateResponse(diary.content),
                        content: diary.content,
                        img: diary.img,
                        userId: userId,
                        private: priavatePost,
                    },
                });
                if (priavatePost) {
                    await Socials.updateSocialsForUser(userId, diary.id);
                }
                return data;
            }
        } catch (error: any) {
            throw error.message;
        }
    }

    static async deleteDay(id: string): Promise<boolean> {
        try {
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

    static async getAllChapters(userId: string, limit: number, offset: number) {
        try {
            const user = await getUserObjById(userId);

            if (!user) {
                console.log("User not found");
                return null;
            }

            const username = user.username;

            const data = await prisma.diary.findMany({
                where: {
                    userId: userId,
                },
                take: limit,
                skip: offset,
                orderBy: { createdAt: "desc" },
            });

            return { data, username };
        } catch (error: any) {
            console.log(error.message);
            return null;
        }
    }

    static async getPrivateChapters(
        userId: string,
        limit: number,
        offset: number
    ) {
        try {
            const data = await prisma.diary.findMany({
                where: {
                    userId: userId,
                    private: true,
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

    static async getPublicChapters(
        userId: string,
        limit: number,
        offset: number
    ) {
        try {
            const data = await prisma.diary.findMany({
                where: {
                    userId: userId,
                    private: false,
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

    static async getAllChaptersIds(userId: string) {
        try {
            console.log(userId);
            const data = await prisma.diary.findMany({
                where: {
                    userId: userId,
                },
                orderBy: { createdAt: "desc" },
            });
            const chapterIds = data.map((diary) => diary.id);
            return chapterIds;
        } catch (error: any) {
            console.log(error.message);
            return null;
        }
    }
}
