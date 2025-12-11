import { pool } from "../../config/db";

const usersServices: any = {};

usersServices.getAllUsers = async () => {
    const result = await pool.query(`SELECT * FROM users`);
    return result;
}

export default usersServices;