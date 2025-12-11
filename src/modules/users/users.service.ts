import { pool } from "../../config/db";

const userServices: any = {};

userServices.getAllUsers = async () => {
    const result = await pool.query(`SELECT * FROM users`);
    return result;
}


export default userServices;