import express from "express";
import {
    createUser,
    deleteUser,
    updateExisUser,
    loginUser,
} from "../controllers/UserController";

const router = express.Router();

router.get("/user/v1/user", updateExisUser);
router.delete("/user/v1/:userid", deleteUser);
router.put("/user/v1/user", updateExisUser);
router.post("/user/v1/signup", createUser);
router.post("/user/v1/login", loginUser);

export default router;
