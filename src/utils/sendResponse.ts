import { Response } from "express";

const sendResponse = (res: Response, status: number, message: Record<string, unknown>) => {
    res.status(status).json(
        message
    );
}

export default sendResponse;