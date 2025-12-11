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
        const user = req.user!;
        const userId = req.params.id;

        if (user.role === "admin" || user.id === userId) {
            const userInfo = req.body;
            const result = await usersServices.updateUser(userId, userInfo);
            return sendResponse(res, 200, {
                success: true,
                message: "User info updated successfully!",
                data: result
            });
        }

        sendResponse(res, 403, {
            success: false,
            message: "You don't have permission to do the operation!"
        });

    } catch (error: any) {
        sendResponse(res, 500, {
            success: false,
            message: error.message,
            error
        });
    }
}

userControllers.deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const result = await usersServices.deleteUser(userId);
        sendResponse(res, 200, {
            success: true,
            message: "user deleted successfully!",
        });
    } catch (error: any) {
        sendResponse(res, 500, {
            success: false,
            message: error.message,
            error
        });
    }
}

export default userControllers;