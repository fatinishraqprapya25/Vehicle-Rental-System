import { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return sendResponse(res, 403, {
            success: false,
            message: "Authorization token must be provided!"
        });
    }
    const tokenParts = authorization.split(" ");
    if (tokenParts[0] !== "Bearer" || !tokenParts[1]) {
        return sendResponse(res, 403, {
            success: false,
            message: "Please provide authorization token in {Bearer + token} format!"
        });
    }
    const decoded = jwt.verify(tokenParts[1], config.jwtSecret) as JwtPayload;
    if (!decoded) {
        return sendResponse(res, 403, {
            success: false,
            message: "Invalid token!"
        });
    }
    if (decoded.role !== "admin") {
        return sendResponse(res, 403, {
            success: false,
            message: "Access Denied"
        });
    }
    req.user = decoded;
    next();
}

export default checkAdmin;