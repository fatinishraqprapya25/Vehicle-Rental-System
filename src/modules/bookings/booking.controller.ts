import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import bookingServices from "./booking.service";

const bookingControllers: any = {};

bookingControllers.createBooking = async (req: Request, res: Response) => {
    try {
        const bookingData = req.body;
        const customer_id = req.user!.id;
        const { vehicle_id, rent_start_at, rent_end_at } = bookingData;
        if (!customer_id || !vehicle_id || !rent_start_at || !rent_end_at) {
            return sendResponse(res, 400, {
                success: false,
                message: "Please provide proper informations to book vehicle!"
            });
        }
        const result = await bookingServices.createBooking(bookingData);
        sendResponse(res, 201, {
            success: true,
            message: "Booking created successfully!",
            data: result
        });
    } catch (error: any) {
        sendResponse(res, 500, {
            success: false,
            message: error.message,
            error
        });
    }
}

bookingControllers.getAllBookings = async (req: Request, res: Response) => {
    try {
        const user = req.user!;
        let result;
        if (user.role === "admin") {
            result = await bookingServices.getAllBookings();
        } else {
            result = await bookingServices.getAllCustomersBookings(user.id);
        }
        sendResponse(res, 200, {
            success: true,
            message: "Bookings retrieved successfully!",
            data: result
        });
    } catch (error: any) {
        sendResponse(res, 500, {
            success: false,
            message: error.message,
            error
        });
    }
}

bookingControllers.updateBooking = async (req: Request, res: Response) => {
    try {
        const bookingId = req.params.id;
        const bookingData = req.body;
        const result = await bookingServices.updateBooking(bookingId, bookingData);
        sendResponse(res, 200, {
            success: true,
            message: "Booking updated successfully!",
            data: result
        });
    } catch (error: any) {
        sendResponse(res, 500, {
            success: false,
            message: error.message,
            error
        });
    }
}

export default bookingControllers;