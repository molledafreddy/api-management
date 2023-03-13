// import { Schema, Types, model, Model } from "mongoose";
import  mongoose, { Schema, Types, model, Model } from "mongoose";
import { WorkingDay } from "../interfaces/working-day.interface";

const WorkingDaySchema: Schema = new Schema <WorkingDay> (
    {
        type: {
            type: String,
            enum: ["normal", "holiday", "inalienable"],
            required: true,
            unique: false,
        },
        created: { 
            type: Date,
            default: Date.now
        }
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);

const workingDayModel = model('workingDay', WorkingDaySchema);
export default workingDayModel;