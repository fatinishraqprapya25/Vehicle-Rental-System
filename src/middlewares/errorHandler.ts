import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import sendResponse from "../utils/sendResponse";

const errorHandler = (error: AppError | Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error instanceof AppError ? error.statusCode : 500;
    const message = error.message || "Internal Server Error!";
    sendResponse(res, statusCode, {
        success: false,
        message,
        error
    });
}

export default errorHandler;