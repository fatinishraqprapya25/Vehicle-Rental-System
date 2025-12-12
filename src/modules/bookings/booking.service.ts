import { pool } from "../../config/db";

const bookingServices: any = {};

interface Booking {
    id: string;
    customer_id: string;
    vehicle_id: string;
    rent_start_at: Date;
    rent_end_at: Date;
    total_price: number;
    status: "active" | "booked" | "returned";
}

bookingServices.createBooking = async (bookingData: Booking) => {
    const { customer_id, vehicle_id, rent_start_at, rent_end_at, total_price, status } = bookingData;
    const result = await pool.query(`
        INSERT INTO bookings(customer_id, vehicle_id, rent_start_at, rent_end_at, total_price, status) VALUES($1, $2, $3, $4, $5, $6)`,
        [customer_id, vehicle_id, rent_start_at, rent_end_at, total_price, status]
    );
    return result;
}

export default bookingServices;