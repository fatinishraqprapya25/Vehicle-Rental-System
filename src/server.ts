import express from "express";
import config from "./config";
import router from "./routes";
import notFoundHandler from "./middlewares/notFoundHandler";
import errorHandler from "./middlewares/errorHandler";
import initDb from "./config/db";

const app = express();

initDb();

app.use(express.json());
app.use("/api/v1", router);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Server listening at port ${config.port}`);
});