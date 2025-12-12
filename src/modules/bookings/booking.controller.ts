import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";

const bookingControllers: any = {};

bookingControllers.createBooking = async (req: Request, res: Response) => {
    try {
        const bookingData = req.body;
        const userId = req.user!.id;
        const { customer_id, vehicle_id, rent_start_at, rent_end_at } = bookingData;
    } catch (error: any) {
        sendResponse(res, 500, {
            success: false,
            message: error.message,
            error
        });
    }
}

export default bookingControllers;