import express from "express";
import {
    createUser,
    deleteUser,
    updateExisUser,
    loginUser,
} from "../controllers/UserController";
import {
    addToday,
    deleteToday,
    getOneDay,
    getDays,
} from "../controllers/DiaryController";
import { verifyJWT } from "../services/JwtServices";

const router = express.Router();

router.delete("/user/v1/user", verifyJWT, deleteUser);
router.put("/user/v1/user", verifyJWT, updateExisUser);
router.post("/user/v1/signup", createUser);
router.post("/user/v1/login", loginUser);
router.get("/user/v1/today", verifyJWT, getOneDay);
router.get("/user/v1/diary", verifyJWT, getDays);
router.delete("/user/v1/:today", verifyJWT, deleteToday);
router.post("/user/v1/today", verifyJWT, addToday);

export default router;
