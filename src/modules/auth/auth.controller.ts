import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import authServices from "./auth.servere";

const authControllers: any = {};

authControllers.register = async (req: Request, res: Response) => {
    try {
        const userInfo = req.body;
        const user = await authServices.register(userInfo);
        if (!user) {
            return sendResponse(res, 500, {
                success: false,
                message: "Failed to register a user!"
            })
        }
        sendResponse(res, 201, {
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

authControllers.login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return sendResponse(res, 500, {
                success: false,
                message: "Please provide proper informations to sign in"
            });
        }
        const user = await authServices.login(email, password);
        const { token, data } = user;
        sendResponse(res, 200, {
            success: true,
            message: "Login successful",
            data,
            token
        });
    } catch (error: any) {
        sendResponse(res, 500, {
            success: false,
            message: error.message,
            error
        });
    }
}

export default authControllers;