import express from "express";
import authRouter from "../modules/auth/auth.routes";
import vehicleRouter from "../modules/vehicles/vehicles.routes";
import userRouter from "../modules/users/users.routes";
import bookingRouter from "../modules/bookings/booking.routes";

const router = express.Router();

const routes = [
    { path: "/auth", handler: authRouter },
    { path: "/vehicles", handler: vehicleRouter },
    { path: "/users", handler: userRouter },
    { path: "/bookings", handler: bookingRouter }
];

routes.forEach(r => router.use(r.path, r.handler));

export default router;