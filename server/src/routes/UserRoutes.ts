import express from "express";
import {
    createUser,
    deleteUser,
    updateExisUser,
    loginUser,
    getUserById,
} from "../controllers/UserController";
import {
    addToday,
    deleteToday,
    getOneDay,
    getDays,
} from "../controllers/DiaryController";
import { verifyJWT, decodeJWT } from "../services/JwtServices";

const router = express.Router();

router.delete("/user/v1/user", verifyJWT, deleteUser);
router.get("/user/v1/user", decodeJWT);
router.get("/user/v1/:user", verifyJWT, getUserById);
router.put("/user/v1/user/update", verifyJWT, updateExisUser);
router.post("/user/v1/signup", createUser);
router.post("/user/v1/login", loginUser);
router.get("/user/v1/open/:diaryId", verifyJWT, getOneDay);
router.get("/user/v1/list/:diary", verifyJWT, getDays);
router.delete("/user/v1/:today", verifyJWT, deleteToday);
router.post("/user/v1/today", addToday);

export default router;
