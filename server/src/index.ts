import express from "express";
import routes from "./routes/UserRoutes";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
const port = process.env.PORT || 8080;
const corsOptions = {
    origin: ["https://diary-ai-five.vercel.app", "http://localhost:5173"],
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(routes);

app.listen(port, async () => {
    console.log(`The server is running on port ${port}`);
});

export default app;
