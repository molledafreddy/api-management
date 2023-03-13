// import { Schema, Types, model, Model } from "mongoose";
import  mongoose, { Schema, Types, model, Model } from "mongoose";
import { paymentType } from "../interfaces/payment-type.interface";

const PaymentTypeSchema: Schema = new Schema <paymentType> (
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

const PaymentTypeModel = model('PaymentType', PaymentTypeSchema);
export default PaymentTypeModel;