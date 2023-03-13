import  mongoose, { Schema, Types, model, Model } from "mongoose";
import { Order } from "../interfaces/order.interface";

const OrderSchema: Schema = new Schema <Order> (
    {
        paymentMethod: {
            type: String,
            enum: ["discounted", "credit", "partial", "consignment"],
            required: true
        },
        paymentDate: {
            type: Date,
        },
        creditPaymentDate: {
            type: Date,
        },
        receptionDate: {
            type: Date,
        },
        EstimateReceptionDate: {
            type: Date,
        },
        orderDate: {
            type: Date,
            default: Date.now
        },
        descriptionOrder: {
            type: String,
            required: false
        },
        status: {
            type: String,
            enum: ["requested", "received", "no_received", "verified", "cancelled", "cancelled_provider", "paid_out", "pending_for_payment"],
            required: true
        },
        estimatedAmount: {
            type: Number,
            required: false
        },
        amountPaid: {
            type: Number,
            required: false
        },
        invoiceFile: {
            type: String,
        },
        
        providers: [{
            type: Schema.Types.ObjectId,
            ref: 'providers'
        }]
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);

const OrderModel = model('orders', OrderSchema);
export default OrderModel;