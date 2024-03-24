import express from "express";
import routes from "./routes/UserRoutes";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
const port = process.env.PORT || 8080;
const corsOptions: cors.CorsOptions = {
    origin: ["https://diary-ai-five.vercel.app/", "http://localhost:5173"],
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use((req: any, res: any, next: any) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(routes);

app.listen(port, async () => {
    console.log(`The server is running on port ${port}`);
});

export default app;
