import express from "express";
import userControllers from "./users.controller";
import checkAdmin from "../../middlewares/checkAdmin";
import checkUser from "../../middlewares/checkUser";

const userRouter = express.Router();

userRouter.get("/", checkAdmin, userControllers.getAllUsers);
userRouter.put("/:id", checkUser, userControllers.updateUser);
userRouter.delete("/:id", checkAdmin, userControllers.deleteUser);

export default userRouter;