import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import showUnauthenciatedMsg from "../utils/showUnauthenticatedMsg";

const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return showUnauthenciatedMsg(res, "Authorization token must be provided!")
    }
    const tokenParts = authorization.split(" ");
    if (tokenParts[0] !== "Bearer" || !tokenParts[1]) {
        return showUnauthenciatedMsg(res, "Please provide authorization token in {Bearer + token} format!")
    }
    const decoded = jwt.verify(tokenParts[1], config.jwtSecret) as JwtPayload;
    if (!decoded) {
        return showUnauthenciatedMsg(res, "Invalid token!");
    }
    if (decoded.role !== "admin") {
        return showUnauthenciatedMsg(res, "Access denied!", 403);
    }
    req.user = decoded;
    next();
}

export default checkAdmin;