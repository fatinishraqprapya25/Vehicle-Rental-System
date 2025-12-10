import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.join(process.cwd(), ".env")
});

const config = {
    port: Number(process.env.PORT),
    connectionStr: process.env.CONNECTION_STR,
    bcryptCircleCount: Number(process.env.BCRYPT_CIRCLE_COUNT),
    jwtSecret: process.env.JWT_SECRET as string
}

export default config;