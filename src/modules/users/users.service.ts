import { pool } from "../../config/db";

const usersServices: any = {};

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
}

type OptionalUser = Partial<User>;

usersServices.getAllUsers = async () => {
    const result = await pool.query(`SELECT * FROM users`);
    return result;
}

usersServices.updateUser = async (userId: string, userData: OptionalUser) => {
    const length = Object.keys(userData).length;
    if (length === 0) {
        return null;
    }
    const setQuery = Object.keys(userData).map((key, index) => `${key}=$${index + 1}`).join(", ");
    const query = `UPDATE users SET ${setQuery} WHERE id=$${length + 1} RETURNING *`;
    const result = await pool.query(query, [...Object.values(userData), userId]);
    return result.rows[0];
}

usersServices.deleteUser = async (userId: string) => {
    const result = await pool.query(`DELETE FROM users WHERE id=$1`, [userId]);
    return result;
}

export default usersServices;