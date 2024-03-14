import { Request, Response } from "express";
import { User } from "../entities/User";
import {
    getUserObjById,
    updateUser,
    userLogin,
} from "../services/UserServices";
import { Status } from "../interfaces-enums/StatusCodes";

export async function createUser(req: Request, res: Response) {
    try {
        const userData: User = req.body.user;
        const user = new User(userData);
        const newUser = await User.addUser(user);
        if (newUser !== null) {
            res.status(Status.Created).send(newUser);
        }
    } catch (error: any) {
        console.error(error.message);
        if (
            error.message.includes("Username") ||
            error.message.includes("EmailId")
        ) {
            res.status(Status.Bad_Requesst).send(error.message);
        } else {
            res.status(Status.Bad_Requesst).send("Something went wrong");
        }
    }
}

export async function loginUser(req: Request, res: Response) {
    try {
        const userData: User = req.body.user;
        console.log(userData);
        const user = await userLogin(userData);
        if (user !== null) {
            res.status(Status.OK).send(user);
        }
    } catch (error: any) {
        if (
            error.message.includes("Username/email") ||
            error.message.includes("Password")
        ) {
            res.status(Status.Bad_Requesst).send(error.message);
        } else {
            res.status(Status.Bad_Requesst).send("Something went wrong");
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
            res.status(Status.Bad_Requesst).send(error.message);
        }
        res.status(Status.Bad_Requesst).send("Something went wrong");
    }
};

export const updateExisUser = async (req: Request, res: Response) => {
    const { user } = req.body;
    const userId = req.header("userId") as string;

    try {
        const data = await updateUser(user, userId);
        if (data !== null) {
            res.status(Status.OK).send(data);
        }
    } catch (error: any) {
        res.status(Status.Bad_Requesst).send("Cannot update");
    }
};
