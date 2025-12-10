import express from "express";
import authControllers from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/signup", authControllers.register);
authRouter.post("/signin", authControllers.login);

export default authRouter;