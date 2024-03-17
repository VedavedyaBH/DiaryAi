import { Request, Response } from "express";
import { Diary } from "../entities/Diary";
import { Status } from "../interfaces-enums/StatusCodes";

export async function addToday(req: Request, res: Response) {
    try {
        const userId = req.header("userId") as string;
        const diaryData: Diary = req.body.today;
        const today = new Diary(diaryData);
        const addedToday = await Diary.addday(today, userId);
        if (addedToday !== null) {
            res.status(Status.Created).send(addedToday);
        } else {
            res.status(Status.BadRequest).send("Could not add");
        }
    } catch (error: any) {
        console.error(error.message);
        if (ReferenceError !== null) {
            res.status(Status.BadRequest).send(error.message);
        } else {
            res.status(Status.BadRequest).send("Something went wrong");
        }
    }
}

export async function getOneDay(req: Request, res: Response) {
    const { diaryId } = req.params;
    try {
        console.log(diaryId);
        const day = await Diary.getDay(diaryId);
        day !== null
            ? res.status(Status.OK).send(day)
            : res.status(Status.BadRequest).send("could not get this day");
    } catch (error) {
        res.status(Status.BadRequest).send("could not get this day");
    }
}

export async function getDays(req: Request, res: Response) {
    const { userId, limit, page } = req.query;
    try {
        const offset =
            (parseInt(page as string) - 1) * parseInt(limit as string);

        const days = await Diary.getManyDays(
            userId as string,
            parseInt(limit as string),
            offset
        );
        days !== null
            ? res.status(Status.OK).send({ days })
            : res.status(Status.BadRequest).send("Could not get this day");
    } catch (error) {
        console.error(error);
        res.status(Status.Internal_Server_Error).send("Internal Server Error");
    }
}

export async function deleteToday(req: Request, res: Response) {
    const diaryId = req.params.today;
    try {
        const isDeleted = await Diary.deleteDay(diaryId);
        console.log(isDeleted);
        isDeleted
            ? res.status(Status.OK).send("deleted")
            : res.status(Status.BadRequest).send("could not delete");
    } catch (error) {
        res.status(Status.BadRequest).send("Cannot delete");
    }
}
