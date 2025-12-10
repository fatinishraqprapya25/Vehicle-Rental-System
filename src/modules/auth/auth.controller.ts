import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import authServices from "./auth.servere";

const authControllers: any = {};

authControllers.register = (req: Request, res: Response) => {
    try {
        const userInfo = req.body;
        const user = authServices.register(userInfo);
        if (!user) {
            return sendResponse(res, 500, {
                success: false,
                message: "Failed to register a user!"
            })
        }
        sendResponse(res, 200, {
            success: true,
            message: "User registered successfully!",
            data: user
        });
    } catch (error: any) {
        sendResponse(res, 500, {
            success: false,
            message: error.message,
            error
        });
    }
}