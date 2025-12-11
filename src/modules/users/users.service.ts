import { pool } from "../../config/db";

const usersServices: any = {};

usersServices.getAllUsers = async () => {
    const result = await pool.query(`SELECT * FROM users`);
    return result;
}

usersServices.getUserById = async (userId: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [userId]);
    return result;
}

export default usersServices;