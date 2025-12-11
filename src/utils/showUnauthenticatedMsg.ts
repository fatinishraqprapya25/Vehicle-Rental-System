import { Response } from "express";
import sendResponse from "./sendResponse";

const showUnauthenciatedMsg = (res: Response, message: string) => {
    sendResponse(res, 403, {
        success: false,
        message
    });
}

export default showUnauthenciatedMsg;