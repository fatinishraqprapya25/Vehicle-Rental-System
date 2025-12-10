import express from "express";
import authRouter from "../modules/auth/auth.routes";

const router = express.Router();

const routes = [
    { path: "/auth", handler: authRouter }
];

routes.forEach(r => router.use(r.path, r.handler));

export default router;