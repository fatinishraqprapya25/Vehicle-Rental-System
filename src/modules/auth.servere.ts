import config from "../config";
import { pool } from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError";

const authServices: Record<string, unknown> = {};

interface UserData {
    name: string;
    phone: string;
    email: string;
    password: string;
    role: "customer" | "admin"
}

authServices.register = async (userData: UserData) => {
    const { name, email, password, phone, role } = userData;
    const hashedPass = await bcrypt.hash(password, config.bcryptCircleCount);
    const result = await pool.query(`
        INSERT INTO users (name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *
        `, [name, email, hashedPass, phone, role]);
    return result.rows[0];
}

authServices.login = async (emailAddr: string, password: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [emailAddr]);
    const user = result.rows[0];
    if (!user) {
        throw new AppError(500, "User not found!");
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
        throw new AppError(500, "Invalid Password!");
    }
    const { id, email, role } = user;
    const token = jwt.sign({ id, email, role }, config.jwtSecret, {
        expiresIn: "30d"
    });

    return {
        user,
        token
    }
}

export default authServices;