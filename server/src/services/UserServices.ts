import { PrismaClient } from "@prisma/client";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import { createToken } from "./JwtServices";

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

export async function userLogin(user: UserProps): Promise<string | boolean> {
    let userData = user.email
        ? await getUserObjByEmail(user.email)
        : await getUserObjByName(user.username);

    if (userData === null) {
        return false;
    }

    const passwordMatch = await bcrypt.compare(
        user.password,
        userData.password
    );

    if (passwordMatch) {
        const token = createToken(user);
        return token;
    }

    return false;
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
export async function updateUser(
    user: UserProps,
    id: string
): Promise<UserProps> {
    try {
        const existingUser = await getUserObjById(id);

        if (existingUser !== null) {
            const data = await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    email: user.email || existingUser.email,
                    username: user.username || existingUser.username,
                    firstName: user.firstName || existingUser.firstName,
                    lastName: user.lastName || existingUser.lastName,
                    password: user.password
                        ? await bcrypt.hash(user.password, 10)
                        : existingUser.password,
                    profilePicture:
                        user.profilePicture || existingUser.profilePicture,
                },
            });
            return data;
        } else {
            throw new Error("Cannot update user");
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
}
