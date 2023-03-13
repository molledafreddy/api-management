import  mongoose, { Schema, Types, model, Model } from "mongoose";
import { paymentTypeHasEgress } from "../interfaces/payment-type-has-egress.interface";

const paymentTypeHasEgressSchema: Schema = new Schema <paymentTypeHasEgress> (
    {
        paymentAmount: {
            type: String,
            required: true
        },
        payments: [{
            type: Schema.Types.ObjectId,
            ref: 'PaymentType'
        }],
        egress: [{
            type: Schema.Types.ObjectId,
            ref: 'egress'
        }]
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);

const paymentTypeHasEgressModel = model('paymentTypeHasEgress', paymentTypeHasEgressSchema);
export default paymentTypeHasEgressModel;