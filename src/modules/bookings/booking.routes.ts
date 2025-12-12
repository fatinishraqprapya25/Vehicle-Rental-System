import express from "express";
import bookingControllers from "./booking.controller";
import checkUser from "../../middlewares/checkUser";

const bookingRouter = express.Router();

bookingRouter.post("/", checkUser, bookingControllers.createBooking);
bookingRouter.get("/", checkUser, bookingControllers.getAllBookings);
bookingRouter.put("/:id", checkUser, bookingControllers.updateBooking);

export default bookingRouter;