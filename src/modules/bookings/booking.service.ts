import { pool } from "../../config/db";
import AppError from "../../utils/AppError";
import vehicleServices from "../vehicles/vehicles.service";

const bookingServices: any = {};

interface Booking {
    id: string;
    customer_id: string;
    vehicle_id: string;
    rent_start_date: Date;
    rent_end_date: Date;
    total_price: number;
    status: "active" | "booked" | "returned";
}

bookingServices.createBooking = async (bookingData: Booking) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = bookingData;

    // calculate days of rent
    const start = new Date(rent_start_date);
    const end = new Date(rent_end_date);
    const difference = end.getTime() - start.getTime();
    const days = difference / (24 * 60 * 60 * 1000);

    const vehicle = await vehicleServices.geVehicleById(vehicle_id);
    if (vehicle.availability_status === "booked") {
        throw new AppError(400, "Vehicle is already booked!");
    }

    const total_price = days * Number(vehicle.daily_rent_price);

    // create booking
    const result = await pool.query(`
        INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
        [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, "active"]
    );

    // change vehicle status
    await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2`, ["booked", vehicle_id]);

    return result.rows[0];
}

bookingServices.getAllBookings = async () => {
    const result = await pool.query(`SELECT * FROM bookings`);
    return result.rows;
}

bookingServices.getAllCustomersBookings = async (customerId: string) => {
    const result = await pool.query(`SELECT * FROM bookings WHERE customer_id=$1`, [customerId]);
    return result.rows;
}

bookingServices.getBookingById = async (bookingId: string) => {
    const result = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [bookingId]);
    return result.rows[0];
}

bookingServices.updateBooking = async (bookingId: string, bookingData: Partial<Booking>) => {
    const keys = Object.keys(bookingData);
    const values = Object.values(bookingData);
    if (keys.length === 0) {
        return null;
    }
    const setQuery = Object.keys(bookingData).map((key, index) => `${key}=$${index + 1}`).join(", ");
    const query = `UPDATE bookings SET ${setQuery} WHERE id=$${keys.length + 1} RETURNING *`;
    const result = await pool.query(query, [...values, bookingId]);
    return result.rows[0];
}

export default bookingServices;