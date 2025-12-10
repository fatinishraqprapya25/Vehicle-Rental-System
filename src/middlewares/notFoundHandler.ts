import { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    sendResponse(res, 404, {
        success: false,
        message: "Page not found!",
        path: req.originalUrl
    });
}

export default notFoundHandler;