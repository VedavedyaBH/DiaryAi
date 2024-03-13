import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "Secret";

export async function createToken(user: UserProps) {
    try {
        const SignUpJWT = jwt.sign({ user }, JWT_SECRET);

        return SignUpJWT;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

exports.verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new Error("Please login");
        }
        const words = token.split(" ");
        const jwtToken = words[1];
        const decodedToken = jwt.verify(jwtToken, JWT_SECRET);

        if (decodedToken) {
            next();
        } else {
            res.status(403).json({
                message: "You are not authorized",
            });
        }
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};
