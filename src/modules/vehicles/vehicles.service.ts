import { pool } from "../../config/db";

const vehicleServices: any = {};

interface Vehicle {
    vehicle_name: string;
    type: "car" | "bike" | "van" | "SUV";
    registration_number: string;
    daily_rent_price: number,
    availability_status: "available" | "booked";
}

type OptionalVehicle = Partial<Vehicle>;

vehicleServices.createVehicle = async (vehicleData: Vehicle) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = vehicleData;
    const result = await pool.query(`
        INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`,
        [vehicle_name, type, registration_number, daily_rent_price, availability_status]
    );
    return result.rows[0];
}

vehicleServices.getAllVehicles = async () => {
    const result = await pool.query(`SELECT * FROM vehicles`);
    return result.rows;
}

vehicleServices.geVehicleById = async (vehicleId: string) => {
    const result = await pool.query("SELECT * FROM vehicles WHERE id=$1", [vehicleId]);
    return result.rows[0];
}

vehicleServices.updateVehicle = async (vehicleId: string, vehicleData: OptionalVehicle) => {
    const keys = Object.keys(vehicleData);
    if (keys.length === 0) {
        return null;
    }
    const setQuery = keys.map((key: string, index: number) => `${key}=$${index + 1}`).join(", ");
    const values = Object.values(vehicleData);
    const query = `UPDATE vehicles SET ${setQuery} WHERE id=$${keys.length + 1} RETURNING *`;
    const result = await pool.query(query, [...values, vehicleId]);
    return result.rows[0];
}

vehicleServices.deleteVehicle = async (vehicleId: string) => {
    const result = await pool.query(`
        DELETE * FROM vehicles WHERE id=$1
        `, [vehicleId]);
    return result;
}

export default vehicleServices;