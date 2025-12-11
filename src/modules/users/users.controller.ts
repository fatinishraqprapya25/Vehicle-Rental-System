import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import usersServices from "./users.service";

const userControllers: any = {};

userControllers.getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await usersServices.getAllUsers();
        sendResponse(res, 200, {
            success: true,
            message: "Users retrieved successfully!",
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

userControllers.updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const userInfo = req.body;
        const result = await usersServices.updateUser(userId, userInfo);
        sendResponse(res, 200, {
            success: true,
            message: "User info updated successfully!",
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