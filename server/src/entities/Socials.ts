import { PrismaClient } from "@prisma/client";
import { User } from "./User";

const prisma = new PrismaClient();

export class Socials {
    static async createSocialsForUser(user: User) {
        try {
            await prisma.socials.create({
                data: {
                    id: user.id,
                    diaryId: [],
                    followers: [],
                    following: [],
                },
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    static async updateSocialsForUser(userId: string, diaryId: string) {
        try {
            const existingSocials = await prisma.socials.findUnique({
                where: {
                    id: userId,
                },
            });

            if (!existingSocials) {
                throw new Error("Socials data not found for the user.");
            }

            const updatedSocials = await prisma.socials.update({
                where: {
                    id: userId,
                },
                data: {
                    diaryId: [...existingSocials.diaryId, diaryId],
                },
            });

            return updatedSocials;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async addFollowerToUser(userId: string, followerUserId: string) {
        try {
            if (!userId || !followerUserId || userId === followerUserId) {
                throw new Error("userId or followerUserId is missing");
            }
            const following = await Socials.getAllFollowing(followerUserId);
            let isFollower: boolean = false;

            following?.following.map((followingId) => {
                if (userId === followingId) {
                    isFollower = true;
                }
            });

            if (isFollower) throw new Error("already following");

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

            const following = await Socials.getAllFollowing(followerUserId);
            let isFollower: boolean = false;

            following?.following.map((followingId) => {
                if (userId === followingId) {
                    isFollower = true;
                }
            });

            if (!isFollower) throw new Error("You are not following");

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
            const userChapters = await prisma.user.findMany({
                where: {
                    id: {
                        in: followedUserIds,
                    },
                },
                select: {
                    username: true,
                    diaries: {
                        where: {
                            private: false,
                        },
                    },
                },
                take: limit,
                skip: offset,
                orderBy: {
                    createdAt: "desc",
                },
            });
            return userChapters;
        } catch (error: any) {
            console.log(error.message);
            return null;
        }
    }

    static async getUserSocialProfile(userId: string, id: string) {
        try {
            let user;
            if (userId == id) {
                user = await prisma.user.findUnique({
                    where: { id: userId },
                    include: {
                        diaries: true,
                        socials: true,
                    },
                });
            } else {
                user = await prisma.user.findUnique({
                    where: { id: userId },
                    select: {
                        username: true,
                        socials: true,
                        diaries: {
                            where: {
                                private: false,
                            },
                        },
                    },
                });
            }
            if (!user) return null;

            return user;
        } catch (error) {
            console.error("Error fetching user with details:", error);
            return null;
        }
    }

    static async getAllFollowing(userId: string) {
        try {
            const followers = await prisma.socials.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    following: true,
                },
            });

            return followers;
        } catch (error) {
            console.error("Error fetching user with details:", error);
            return null;
        }
    }
    static async getFeedForPublic(limit: number, offset: number) {
        try {
            const userChapters = await prisma.user.findMany({
                select: {
                    username: true,
                    diaries: {
                        where: {
                            private: false,
                        },
                    },
                },
                take: limit,
                skip: offset,
                orderBy: {
                    createdAt: "desc",
                },
            });
            return userChapters;
        } catch (error: any) {
            console.log(error.message);
            return null;
        }
    }
}
