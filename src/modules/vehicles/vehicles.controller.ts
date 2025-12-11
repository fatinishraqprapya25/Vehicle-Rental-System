import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import vehicleServices from "./vehicles.service";

const vehicleControllers: any = {};

vehicleControllers.createVehicle = async (req: Request, res: Response) => {
    try {
        const vehicleDetails = req.body;
        const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = vehicleDetails;
        if (!vehicle_name || !type || !registration_number || !daily_rent_price || !availability_status) {
            return sendResponse(res, 400, {
                success: false,
                message: "Please provide proper informations to create vehicle!"
            });
        }
        const result = await vehicleServices.createVehicle(vehicleDetails);
        sendResponse(res, 201, {
            success: true,
            message: "Vehicle created successfully!",
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

vehicleControllers.getAllVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.getAllVehicles();
        sendResponse(res, 200, {
            success: true,
            message: "Vehicle Retrieved Successfully!",
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

vehicleControllers.getVehicleById = async (req: Request, res: Response) => {
    try {
        const vehicleId = req.params.id;
        const result = await vehicleServices.getVehicleById(vehicleId);
        sendResponse(res, 200, {
            success: true,
            message: "Vehicle retrieved successfully!",
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


export default vehicleControllers;