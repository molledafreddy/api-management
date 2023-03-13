// import { Schema, Types, model, Model } from "mongoose";
import  mongoose, { Schema, Types, model, Model } from "mongoose";
import { Bank } from "../interfaces/bank.interface";

const BankSchema: Schema = new Schema <Bank> (
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String
        }
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);

const BankModel = model('banks', BankSchema);
export default BankModel;