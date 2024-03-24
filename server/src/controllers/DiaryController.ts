import { Request, Response } from "express";
import { Diary } from "../entities/Diary";
import { Status } from "../interfaces-enums/StatusCodes";

export async function addDiaryEntry(req: Request, res: Response) {
    try {
        const { id } = req.user;
        const diaryData: Diary = req.body.today;
        const privatePost: boolean = req.body.private;
        const today = new Diary(diaryData);
        const addedToday = await Diary.addday(today, id, privatePost);
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

export async function getDiaryEntry(req: Request, res: Response) {
    const { chapterId } = req.params;
    try {
        const day = await Diary.getDay(chapterId);
        day !== null
            ? res.status(Status.OK).send(day)
            : res.status(Status.BadRequest).send("could not get this day");
    } catch (error) {
        res.status(Status.BadRequest).send("could not get this day");
    }
}

export async function getDiaryEntries(req: Request, res: Response) {
    const { limit, page } = req.query;
    const { id } = req.user;
    try {
        const offset =
            (parseInt(page as string) - 1) * parseInt(limit as string);

        const days = await Diary.getAllChapters(
            id as string,
            parseInt(limit as string),
            offset
        );
        days !== null
            ? res.status(Status.OK).send(days)
            : res.status(Status.BadRequest).send("Could not get this day");
    } catch (error) {
        console.error(error);
        res.status(Status.Internal_Server_Error).send("Internal Server Error");
    }
}

export async function deleteDiaryEntry(req: Request, res: Response) {
    const diaryId = req.params.today;
    try {
        const isDeleted = await Diary.deleteDay(diaryId);
        isDeleted
            ? res.status(Status.OK).send("deleted")
            : res.status(Status.BadRequest).send("could not delete");
    } catch (error) {
        res.status(Status.BadRequest).send("Cannot delete");
    }
}

export async function getPrivateChapters(req: Request, res: Response) {
    try {
        const { userId, limit, page } = req.query;
        const offset =
            (parseInt(page as string) - 1) * parseInt(limit as string);

        const chapters = await Diary.getPrivateChapters(
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

export async function getPublicChapters(req: Request, res: Response) {
    try {
        const { userId, limit, page } = req.query;
        const offset =
            (parseInt(page as string) - 1) * parseInt(limit as string);

        const chapters = await Diary.getPublicChapters(
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

export async function getDiaryIdsofUser(req: Request, res: Response) {
    const { id } = req.user;
    try {
        const chapters = await Diary.getAllChaptersIds(id as string);
        chapters !== null
            ? res.status(Status.OK).send({ chapters })
            : res.status(Status.BadRequest).send("Could not get this day");
    } catch (error) {
        console.error(error);
        res.status(Status.Internal_Server_Error).send("Internal Server Error");
    }
}
