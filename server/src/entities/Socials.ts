import { PrismaClient } from "@prisma/client";
import { User } from "./User";

const prisma = new PrismaClient();

export class Socials extends User {
    id: string;
    diaryId: string[];
    followers: string[];
    following: string[];

    constructor(user: User) {
        super(user);
        this.id = user.id;
        this.diaryId = [];
        this.followers = [];
        this.following = [];
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

    static async getFeedForUser(userId: string, limit: number, offset: number) {
        try {
            console.log(userId);
            const socials = await prisma.socials.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    following: true,
                },
            });

            if (!socials) {
                throw new Error("Socials not found");
            }

            const followedUserIds = socials.following;
            const chapters = await prisma.diary.findMany({
                where: {
                    userId: {
                        in: followedUserIds,
                    },
                    private: false,
                },
                take: limit,
                skip: offset,
                orderBy: {
                    createdAt: "desc",
                },
            });
            return chapters;
        } catch (error: any) {
            console.log(error.message);
            return null;
        }
    }

    static async getUserSocialProfile(userId: string) {
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                include: {
                    diaries: true,
                    socials: true,
                },
            });

            if (!user) return null;

            return user;
        } catch (error) {
            console.error("Error fetching user with details:", error);
            return null;
        }
    }
}
