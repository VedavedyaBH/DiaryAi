import express from "express";
import {
    createUser,
    deleteUser,
    updateProfile,
    loginUser,
    getUserProfile,
    getUserObjByUsername,
} from "../controllers/UserController";
import {
    addDiaryEntry,
    deleteDiaryEntry,
    getDiaryEntry,
    getDiaryEntries,
    getPrivateChapters,
    getPublicChapters,
    getDiaryIdsofUser,
} from "../controllers/DiaryController";
import {
    follow,
    unfollow,
    getFeedForUser,
    getUserSocialProfile,
} from "../controllers/SocialsController";
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
router.get("/api/v1/all/diaries", verifyJWT, getDiaryIdsofUser);
router.delete("/api/v1/diaries/:id", verifyJWT, deleteDiaryEntry);
router.post("/api/v1/diaries", verifyJWT, addDiaryEntry);
router.get("/api/v1/diaries/private/:userId", verifyJWT, getPrivateChapters);
router.get("/api/v1/diaries/public/:userId", verifyJWT, getPublicChapters);

router.post("/api/v1/socials/follow", verifyJWT, follow);
router.delete("/api/v1/socials/follow", verifyJWT, unfollow);
router.get("/api/v1/socials/feed", verifyJWT, getFeedForUser);
router.get("/api/v1/socials/profile/:userId", verifyJWT, getUserSocialProfile);
router.get(
    "/api/v1/socials/profile/users/find",
    verifyJWT,
    getUserObjByUsername
);

export default router;
