import express from "express";
import authRouter from "../modules/auth/auth.routes";
import vehicleRouter from "../modules/vehicles/vehicles.routes";

const router = express.Router();

const routes = [
    { path: "/auth", handler: authRouter },
    { path: "/vehicles", handler: vehicleRouter }
];

routes.forEach(r => router.use(r.path, r.handler));

export default router;