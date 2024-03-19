import express from "express";
import {
    createUser,
    deleteUser,
    updateProfile,
    loginUser,
    getUserProfile,
} from "../controllers/UserController";
import {
    addDiaryEntry,
    deleteDiaryEntry,
    getDiaryEntry,
    getDiaryEntries,
} from "../controllers/DiaryController";
import { verifyJWT, decodeJWT } from "../services/JwtServices";

const router = express.Router();

router.delete("/api/v1/users", verifyJWT, deleteUser);
router.get("/api/v1/users/auth", decodeJWT);
router.get("/api/v1/users/profile/:id", verifyJWT, getUserProfile);
router.put("/api/v1/users/profile", verifyJWT, updateProfile);
router.post("/api/v1/signup", createUser);
router.post("/api/v1/login", loginUser);
router.get("/api/v1/diaries/:chapterId", verifyJWT, getDiaryEntry);
router.get("/api/v1/diaries", verifyJWT, getDiaryEntries);
router.delete("/api/v1/diaries/:id", verifyJWT, deleteDiaryEntry);
router.post("/api/v1/diaries", addDiaryEntry);

export default router;
