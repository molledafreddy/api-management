// import { Schema, Types, model, Model } from "mongoose";
import  mongoose, { Schema, Types, model, Model } from "mongoose";
import { Car } from "../interfaces/car.interface";

const StorageSchema: Schema = new Schema <Storage> (
    {
        fileName: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
        },
        idUser: {
            type: String,
            required: true
        }
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);

const StorageModel = model('storage', StorageSchema);
export default StorageModel;