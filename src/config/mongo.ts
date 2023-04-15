import "dotenv/config";
import { connect } from "mongoose";

async function dbConnect(): Promise<void> {
    // const DB_URI = <string>process.env.DB_URI;
    const DB_URI = "mongodb+srv://molledafreddy:freddy2..@cluster0.1e16p.mongodb.net/prueba";
    console.log(DB_URI);
    await connect(DB_URI)
} 

export default dbConnect;