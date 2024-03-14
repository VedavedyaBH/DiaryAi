import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { getUserObjByEmail, getUserObjByName } from "../services/UserServices";
const prisma = new PrismaClient();

export class User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profilePicture: string;

    constructor(user: User) {
        this.id = uuidv4();
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.profilePicture = user.profilePicture || "";
        this.password = user.password;
    }

    static async setPassword(password: string) {
        return (password = await bcrypt.hash(password, 10));
    }

    static async addUser(user: User): Promise<User | null> {
        try {
            const existingUserName = await getUserObjByName(user.username);
            const existingEmail = await getUserObjByEmail(user.email);

            if (existingUserName) {
                throw new Error("Username Exists");
            }
            if (existingEmail !== null) {
                throw new Error("EmailId Exists");
            }

            const data = await prisma.user.create({
                data: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    password: await this.setPassword(user.password),
                    profilePicture: user.profilePicture,
                },
            });
            return data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async removeUser(user: User): Promise<User> {
        try {
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
}
