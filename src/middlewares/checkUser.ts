import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import showUnauthenciatedMsg from "../utils/showUnauthenticatedMsg";

const checkUser = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return showUnauthenciatedMsg(res, "User must be logged in");
    }
    const tokenParts = authorization.split(" ");
    if (tokenParts[0] !== "Bearer" || !tokenParts[1]) {
        return showUnauthenciatedMsg(res, `Please use { Bearer + token } format`);
    }
    const decoded = jwt.verify(tokenParts[1], config.jwtSecret) as JwtPayload;
    if (!decoded) {
        return showUnauthenciatedMsg(res, "Invalid Token");
    }
    req.user = decoded;
    next();
}

export default checkUser;