import { pool } from "../../config/db";

const vehicleServices: any = {};

interface Vehicle {
    vehicle_name: string;
    type: "car" | "bike" | "van" | "SUV";
    registration_number: string;
    daily_rent_price: number,
    availability_status: "available" | "booked";
}

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



export default vehicleServices;