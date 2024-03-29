import { Request, Response } from "express";
import { User } from "../entities/User";
import {
    getUserObjById,
    updateUser,
    userLogin,
    getUserObjByLetters,
} from "../services/UserServices";
import { Socials } from "../entities/Socials";
import { Status } from "../interfaces-enums/StatusCodes";

export async function createUser(req: Request, res: Response) {
    try {
        const userData: User = req.body.user;
        const user = new User(userData);
        const newUser = await User.addUser(user);
        newUser ? Socials.createSocialsForUser(newUser) : null;
        if (newUser !== null) {
            res.status(Status.Created).send(newUser);
        }
    } catch (error: any) {
        console.error(error.message);
        if (
            error.message.includes("Username") ||
            error.message.includes("EmailId")
        ) {
            res.status(Status.BadRequest).send(error.message);
        } else {
            res.status(Status.BadRequest).send("Something went wrong");
        }
    }
}

export async function loginUser(req: Request, res: Response) {
    try {
        const userData: User = req.body.user;
        const user = await userLogin(userData);
        if (user !== null) {
            res.status(Status.OK).send(user);
        }
    } catch (error: any) {
        if (
            error.message.includes("Username/email") ||
            error.message.includes("Password")
        ) {
            res.status(Status.BadRequest).send(error.message);
        } else {
            res.status(Status.BadRequest).send("Something went wrong");
        }
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.body;

    try {
        const userObj = await getUserObjById(userId);
        const data = userObj !== null ? await User.removeUser(userObj) : null;
        if (data !== null) {
            res.status(Status.OK).send(data);
        } else {
            throw new Error("User does not exist");
        }
    } catch (error: any) {
        if (
            error.message.includes("User does not exist") ||
            error.message.includes("Cannot delete")
        ) {
            res.status(Status.BadRequest).send(error.message);
        }
        res.status(Status.BadRequest).send("Something went wrong");
    }
};

export const updateProfile = async (req: any, res: Response) => {
    const { user } = req.body;
    const { id } = req.user;

    try {
        const data = await updateUser(user, id);
        if (data !== null) {
            res.status(Status.OK).send(data);
        }
    } catch (error: any) {
        res.status(Status.BadRequest).send("Cannot update");
    }
};

export const getUserProfile = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const userObj = await getUserObjById(userId);
        if (userObj !== null) {
            res.status(Status.OK).send(userObj);
        }
    } catch (error: any) {
        res.status(Status.BadRequest).send("Cannot find");
    }
};

export async function getUserObjByUsername(req: any, res: Response) {
    const { limit, page, query } = req.query;
    try {
        const offset =
            (parseInt(page as string) - 1) * parseInt(limit as string);
        const users = await getUserObjByLetters(
            query as string,
            parseInt(limit as string),
            offset
        );
        users
            ? res.status(Status.OK).send(users)
            : res.status(Status.BadRequest).send("Something went wrong");
    } catch (error: any) {
        res.status(Status.BadRequest).send("Something went wrong");
    }
}
