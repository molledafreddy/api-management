import  mongoose, { Schema, Types, model, Model } from "mongoose";
import { DetailRevenue } from "../interfaces/detail-revenue.interface";

const DetailRevenueSchema: Schema = new Schema <DetailRevenue> (
    {
        type: {
            type: String,
            enum: ["efectivo", "punto", "transferencia", "otros"],
            required: true
        },
        description: {
            type: String,
        },
        amount: {
            type: Number,
            required: true
        },
        revenues: [{
            type: Schema.Types.ObjectId,
            ref: 'revenues'
        }]
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);

const DetailRevenueModel = model('detailRevenue', DetailRevenueSchema);
export default DetailRevenueModel;