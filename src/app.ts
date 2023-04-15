import "dotenv/config"
import express from "express";
import cors from "cors";
import { router } from "./routes";
import db from "./config/mongo";
import mongoose from "mongoose";
// import  multer  from "multer";
// import  sharp  from "sharp";
import fileUpload from "express-fileupload";

const DB_URI = <string>process.env.DB_URI;
// const DB_URI = process.env.DB_URI;

const PORT = process.env.PORT || 3002;
const app = express();
app.use(cors());


app.use(express.json())

app.use(router);

db().then(() => console.log('conexion Ready'))
app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));

// const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.raz9g.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
// mongoose
//   .connect(DB_URI)
//   .then(() =>
//     app.listen(PORT, () =>
//       console.log(`Server running on http://localhost:${PORT}`)
//     )
//   )
//   .catch((error) => {
//     throw error;
//   });



