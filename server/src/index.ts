import express from "express";
import routes from "./routes/UserRoutes";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());
app.use(routes);

app.listen(port, async () => {
    console.log(`The server is running on port ${port}`);
});
