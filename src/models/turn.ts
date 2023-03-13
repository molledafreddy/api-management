// import { Schema, Types, model, Model } from "mongoose";
import  mongoose, { Schema, Types, model, Model } from "mongoose";
import { Turn } from "../interfaces/turn.interface";

const TurnSchema: Schema = new Schema <Turn> (
    {
        startDate: {
            type: Date
        },
        endDate: {
            type: Date,
        },
        description: {
            type: String,
        },
        status: {
            type: String,
            enum: ["Active", "Stop", "completed"],
        },
        statusPayment: {
            type: String,
            enum: ["Paid", "In_verification", "verified", "Canceled", "Not_Payed"],
        },
        type: {
            type: String,
            enum: ["normal", "full", "partial"],
            required: true
        },
        users: [{
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        }],
        paymentDate: {
            type: Date,
        },
        workingDay: [{
            type: Schema.Types.ObjectId,
            ref: 'workingDay',
            required: true
        }]
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);

const TurnModel = model('turns', TurnSchema);
export default TurnModel;