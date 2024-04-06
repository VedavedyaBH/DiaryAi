import { Request, Response } from "express";
import { Status } from "../interfaces-enums/StatusCodes";
import { Socials } from "../entities/Socials";

export async function follow(req: any, res: Response) {
    try {
        const { toFollow } = req.body;
        const { id } = req.user;
        const success = await Socials.addFollowerToUser(toFollow, id);
        success
            ? res.status(Status.Created).send("done")
            : res.status(Status.BadRequest).send("Something went wrong");
    } catch (error: any) {
        res.status(Status.BadRequest).send("Something went wrong");
    }
}

export async function unfollow(req: any, res: Response) {
    try {
        const { toFollow } = req.body;
        const { id } = req.user;
        const success = await Socials.removeFollowerToUser(toFollow, id);
        success
            ? res.status(Status.OK).send("done")
            : res.status(Status.BadRequest).send("Something went wrong");
    } catch (error: any) {
        res.status(Status.BadRequest).send("Something went wrong");
    }
}
export async function getFeedForUser(req: any, res: Response) {
    try {
        const { limit, page } = req.query;
        const { id } = req.user;
        const offset =
            (parseInt(page as string) - 1) * parseInt(limit as string);

        const userChapters = await Socials.getFeedForUser(
            id as string,
            parseInt(limit as string),
            offset
        );
        userChapters
            ? res.status(Status.OK).send(userChapters)
            : res.status(Status.BadRequest).send("Something went wrong");
    } catch (error: any) {
        res.status(Status.BadRequest).send("Something went wrong");
    }
}

export async function getUserSocialProfile(req: any, res: Response) {
    try {
        const { userId } = req.params;
        const { id } = req.user;
        const user = await Socials.getUserSocialProfile(userId as string, id);
        user
            ? res.status(Status.OK).send(user)
            : res.status(Status.BadRequest).send("Something went wrong");
    } catch (error: any) {
        res.status(Status.BadRequest).send("Something went wrong");
    }
}
