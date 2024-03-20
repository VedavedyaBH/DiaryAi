import { PrismaClient } from "@prisma/client";
import { User } from "./User";

const prisma = new PrismaClient();

export class Socials {
    id: string;
    diaryId: string[] | null;
    followers: string[] | null;
    following: string[] | null;

    constructor(user: User) {
        (this.id = user.id), (this.diaryId = null);
        this.followers = [];
        this.following = [];
        this.createSocialsForUser();
    }

    async createSocialsForUser() {
        try {
            const newSocials = await prisma.socials.create({
                data: {
                    id: this.id,
                    diaryId: [],
                    followers: [],
                    following: [],
                },
            });
            console.log(newSocials);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async addFollowerToUser(userId: string, followerUserId: string) {
        try {
            if (!userId || !followerUserId || userId === followerUserId) {
                throw new Error("userId or followerUserId is missing");
            }

            const socials = await prisma.$transaction([
                prisma.socials.update({
                    where: { id: userId },
                    data: {
                        followers: { push: followerUserId },
                    },
                }),
                prisma.socials.update({
                    where: { id: followerUserId },
                    data: {
                        following: { push: userId },
                    },
                }),
            ]);

            if (socials) {
                return true;
            } else {
                return false;
            }
        } catch (error: any) {
            console.error(error.message);
            throw new Error("Could not add follower");
        }
    }

    static async removeFollowerToUser(userId: string, followerUserId: string) {
        try {
            if (!userId || !followerUserId || userId === followerUserId) {
                throw new Error("userId or followerUserId is missing");
            }

            const updateUserResult = await prisma.socials.update({
                where: { id: userId },
                data: {
                    followers: {
                        set:
                            (
                                await prisma.socials.findUnique({
                                    where: { id: userId },
                                })
                            )?.followers?.filter(
                                (id) => id !== followerUserId
                            ) || [],
                    },
                },
            });

            const updateFollowerResult = await prisma.socials.update({
                where: { id: followerUserId },
                data: {
                    following: {
                        set:
                            (
                                await prisma.socials.findUnique({
                                    where: { id: followerUserId },
                                })
                            )?.following?.filter((id) => id !== userId) || [],
                    },
                },
            });

            if (updateUserResult && updateFollowerResult) {
                return true;
            } else {
                return false;
            }
            
        } catch (error: any) {
            console.error(error.message);
            throw new Error("Could not remove follower");
        }
    }
}
