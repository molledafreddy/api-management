import "dotenv/config";
import { connect } from "mongoose";

// const NODE_ENV = process.env.NODE_ENV;

async function dbConnect(): Promise<void> {
    //const DB_URI = <string>process.env.DB_URI;
    const DB_URI = <string>'mongodb+srv://molledafreddy:magallanes2721.@cluster0.1e16p.mongodb.net/app-manager?retryWrites=true&w=majority&appName=Cluster0';
    console.log(DB_URI);
    await connect(DB_URI)
} 

export default dbConnect;