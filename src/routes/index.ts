import express from "express";
import authRouter from "../modules/auth/auth.routes";
import vehicleRouter from "../modules/vehicles/vehicles.routes";
import userRouter from "../modules/users/users.routes";

const router = express.Router();

const routes = [
    { path: "/auth", handler: authRouter },
    { path: "/vehicles", handler: vehicleRouter },
    { path: "/users", handler: userRouter }
];

routes.forEach(r => router.use(r.path, r.handler));

export default router;