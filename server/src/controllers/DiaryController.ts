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
            res.status(Status.Bad_Requesst).send("Could not add");
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

export async function getOneDay(req: Request, res: Response) {
    const { diaryId } = req.body;
    try {
        const day = await Diary.getDay(diaryId);
        day !== null
            ? res.status(Status.OK).send(day)
            : res.status(Status.Bad_Requesst).send("could not get this day");
    } catch (error) {
        res.status(Status.Bad_Requesst).send("could not get this day");
    }
}

export async function getDays(req: Request, res: Response) {
    const { userId } = req.body;
    try {
        const days = await Diary.getManyDays(userId);
        days !== null
            ? res.status(Status.OK).send(days)
            : res.status(Status.Bad_Requesst).send("could not get this day");
    } catch (error) {
        res.status(Status.Bad_Requesst).send("could not get this day");
    }
}

export async function deleteToday(req: Request, res: Response) {
    const diaryId = req.params.today;
    try {
        const isDeleted = await Diary.deleteDay(diaryId);
        console.log(isDeleted);
        isDeleted
            ? res.status(Status.OK).send("deleted")
            : res.status(Status.Bad_Requesst).send("could not delete");
    } catch (error) {
        res.status(Status.Bad_Requesst).send("Cannot delete");
    }
}
