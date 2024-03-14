import { PrismaClient } from "@prisma/client";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import { createToken } from "./JwtServices";

const prisma = new PrismaClient();

export async function userLogin(user: User): Promise<string | boolean> {
    try {
        let userData = user.email
            ? await getUserObjByEmail(user.email)
            : await getUserObjByName(user.username);

        if (userData === null) {
            throw new Error("Username/email does not exist");
        }

        const ispasswordMatched = await bcrypt.compare(
            user.password,
            userData.password
        );

        if (ispasswordMatched) {
            const token = createToken(user);
            return token;
        } else {
            throw new Error("Password did not match");
        }

        return false;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getUserObjById(id: string): Promise<User | null> {
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
export async function getUserObjByName(username: string): Promise<User | null> {
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
export async function getUserObjByEmail(email: string): Promise<User | null> {
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

export async function updateUser(user: User, id: string): Promise<User> {
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
