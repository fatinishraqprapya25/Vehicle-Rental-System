import config from "../config";
import { pool } from "../config/db";
import bcrypt from "bcrypt";

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
        INSERT INTO users (name, email, password, phone, role) RETURNING *
        `, [name, email, hashedPass, phone, role]);
    return result.rows[0];
}

export default authServices;