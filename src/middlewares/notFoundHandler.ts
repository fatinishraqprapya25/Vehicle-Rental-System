import { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    sendResponse(res, 404, {
        success: false,
        message: "Page not found!"
    });
}

export default notFoundHandler;