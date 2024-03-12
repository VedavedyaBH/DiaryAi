import { Request, Response, NextFunction } from "express";
import { User } from "../entities/User";
import { addUser, removeUser } from "../services/UserServices";
import { Status } from "../interfaces-enums/StatusCodes";

export async function createUser(req: Request, res: Response) {
    try {
        const userData: UserProps = req.body.user;
        const user = new User(userData);
        const newUser = await addUser(user);
        if (newUser) {
            res.status(Status.Created).send(newUser);
        } else {
            res.status(Status.Created).send("Username/email exists");
        }
    } catch (error: any) {
        console.error(error.message);
        if (ReferenceError !== null) {
            res.status(Status.Bad_Requesst).send(error.message);
        } else {
            res.status(Status.Bad_Requesst).send("Something went wrong");
        }
    }
}

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userId } = req.body;

    try {
        const data = await removeUser(userId);
        res.status(Status.OK).send(data);
    } catch (error) {
        res.status(Status.Bad_Requesst).send("Cannot delete");
    }
};
