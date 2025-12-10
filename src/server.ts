import express from "express";
import config from "./config";
import router from "./routes";
import notFoundHandler from "./middlewares/notFoundHandler";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use("/api", router);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Server listening at port ${config.port}`);
});