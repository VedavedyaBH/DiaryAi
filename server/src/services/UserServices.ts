import { PrismaClient } from "@prisma/client";
import { User } from "../entities/User";

const prisma = new PrismaClient();

export async function addUser(user: User): Promise<UserProps | null> {
    const existingUserName = await getUserObjByName(user.username);
    const existingEmail = await getUserObjByEmail(user.email);

    if (existingUserName || existingEmail !== null) {
        return null;
    }

    const data = await prisma.user.create({
        data: {
            id: user.id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            profilePicture: user.profilePicture,
        },
    });
    return data;
}

export async function getUserObjById(id: string): Promise<UserProps | null> {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: id,
            },
        });

        if (!user) {
            return null;
        }
        return user;
    } catch (error: any) {
        return error;
    }
}
export async function getUserObjByName(
    username: string
): Promise<UserProps | null> {
    try {
        const user = await prisma.user.findFirst({
            where: {
                username: username,
            },
        });

        if (!user) {
            return null;
        }
        return user;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
export async function getUserObjByEmail(
    email: string
): Promise<UserProps | null> {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });

        if (!user) {
            return null;
        }
        return user;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function removeUser(id: string): Promise<UserProps> {
    try {
        const user = await getUserObjById(id);
        if (user !== null) {
            const data = await prisma.user.delete({
                where: {
                    id: user.id,
                },
            });
            return data;
        } else {
            throw new Error("Cannot delete user");
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
}
