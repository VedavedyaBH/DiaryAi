import express from "express";
import routes from "./routes/UserRoutes";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 8080;
const corsOptions = {
    origin: "https://diary-ai-five.vercel.app/",
    credentials: true,
    optionSuccessStatus: 200,
};
const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(routes);

app.listen(port, async () => {
    console.log(`The server is running on port ${port}`);
});
