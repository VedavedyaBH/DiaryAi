import { Request, Response } from "express";
import { Status } from "../interfaces-enums/StatusCodes";
import { Socials } from "../entities/Socials";

export async function follow(req: Request, res: Response) {
    try {
        const { userId, followerUserId } = req.body;
        const success = await Socials.addFollowerToUser(userId, followerUserId);
        success
            ? res.status(Status.Created).send("done")
            : res.status(Status.BadRequest).send("Something went wrong");
    } catch (error: any) {
        res.status(Status.BadRequest).send("Something went wrong");
    }
}

export async function unfollow(req: Request, res: Response) {
    try {
        const { userId, followerUserId } = req.body;
        const success = await Socials.removeFollowerToUser(
            userId,
            followerUserId
        );
        success
            ? res.status(Status.OK).send("done")
            : res.status(Status.BadRequest).send("Something went wrong");
    } catch (error: any) {
        res.status(Status.BadRequest).send("Something went wrong");
    }
}
export async function getFeedForUser(req: Request, res: Response) {
    try {
        const { userId, limit, page } = req.query;
        const offset =
            (parseInt(page as string) - 1) * parseInt(limit as string);

        const chapters = await Socials.getFeedForUser(
            userId as string,
            parseInt(limit as string),
            offset
        );
        chapters
            ? res.status(Status.OK).send(chapters)
            : res.status(Status.BadRequest).send("Something went wrong");
    } catch (error: any) {
        res.status(Status.BadRequest).send("Something went wrong");
    }
}

export async function getUserSocialProfile(req: Request, res: Response) {
    try {
        const { userId } = req.params;
        const user = await Socials.getUserSocialProfile(userId as string);
        user
            ? res.status(Status.OK).send(user)
            : res.status(Status.BadRequest).send("Something went wrong");
    } catch (error: any) {
        res.status(Status.BadRequest).send("Something went wrong");
    }
}