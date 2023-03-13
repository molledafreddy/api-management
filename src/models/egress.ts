import  mongoose, { Schema, Types, model, Model } from "mongoose";
import { Egress } from "../interfaces/egress.interface";

const EgressSchema: Schema = new Schema <Egress> (
    {
        invoiceNumber: {
            type: String,
            required: false
        },
        amount: {
            type: Number,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        files: {
            type: Array,
            required: false
        },
        orders: [{
            type: Schema.Types.ObjectId,
            ref: 'orders',
            required: false
        }],
        operationBills: [{
            type: Schema.Types.ObjectId,
            ref: 'operationBills',
            required: false
        }],
        payroll: [{
            type: Schema.Types.ObjectId,
            ref: 'payroll',
            required: false
        }]
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);

const EgressModel = model('egress', EgressSchema);
export default EgressModel;