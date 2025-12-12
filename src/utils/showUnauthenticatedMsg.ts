import { Response } from "express";
import sendResponse from "./sendResponse";

const showUnauthenciatedMsg = (res: Response, message: string, statusCode?: (number | undefined)) => {
    const status: number = statusCode ? statusCode : 401;
    sendResponse(res, status, {
        success: false,
        message
    });
}

export default showUnauthenciatedMsg;