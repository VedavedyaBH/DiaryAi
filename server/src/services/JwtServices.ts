import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../entities/User";
import { Request, Response, NextFunction } from "express";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "Secret";

interface AuthenticatedRequest extends Request {
    user?: any;
}

export async function createToken(user: User) {
    try {
        const SignUpJWT = jwt.sign(user, JWT_SECRET, { expiresIn: "10h" });
        return SignUpJWT;
    } catch (error: any) {
        console.log(error.message);
        throw new Error(error.message);
    }
}

export async function verifyJWT(req: any, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new Error("Please login");
        }
        // const words = token.split(" ");
        // const jwtToken = words[1];
        const decodedToken = jwt.verify(token, JWT_SECRET);

        // if (decodedToken) {
        //     next();
        // } else {
        //     res.status(403).json({
        //         message: "You are not authorized",
        //     });
        // }

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        jwt.verify(
            token,
            JWT_SECRET,
            (err: jwt.VerifyErrors | null, decoded: any) => {
                if (err) {
                    return res.status(401).json({ message: "Invalid token" });
                }
                req.user = decoded;
                next();
            }
        );
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
}

export async function decodeJWT(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const token = req.headers.authorization as string;
        if (token === null) {
            throw new Error("Please login");
        }
        const words = token.split(" ");
        const jwtToken = words[1];
        const decodedToken = jwt.verify(jwtToken, JWT_SECRET);

        if (decodedToken) {
            res.send(decodedToken);
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
}
