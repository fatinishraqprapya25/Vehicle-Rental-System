import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
    connectionString: config.connectionStr
});

const initDb = async () => {
    // user table
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password TEXT NOT NULL CHECK (LENGTH(password) >= 6),
        phone VARCHAR(16) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'customer'
        )
        `);
}


export default initDb;