import express from "express";
import checkAdmin from "../../middlewares/checkAdmin";
import vehicleControllers from "./vehicles.controller";

const vehicleRouter = express.Router();

vehicleRouter.post("/", checkAdmin, vehicleControllers.createVehicle);
vehicleRouter.get("/", vehicleControllers.getAllVehicles);
vehicleRouter.get("/:id", vehicleControllers.getVehicleById);
vehicleRouter.put("/:id", checkAdmin, vehicleControllers.updateVehicle);
vehicleRouter.delete("/:id", checkAdmin, vehicleControllers.deleteVehicle);

export default vehicleRouter;