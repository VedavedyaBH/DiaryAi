import express from "express";
import { createUser, deleteUser } from "../controllers/UserController";

const router = express.Router();

router.post("/user/v1/signup", createUser);
router.delete("/user/v1/:userid", deleteUser);


export default router;
