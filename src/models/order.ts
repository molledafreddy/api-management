import  mongoose, { Schema, Types, model, Model } from "mongoose";
import { Order } from "../interfaces/order.interface";

const OrderSchema: Schema = new Schema <Order> (
    {
        paymentMethod: {
            type: String,
            enum: ["descontado", "credito", "parcial", "consignacion"],
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
            enum: ["solicitado", "recibido", "no_recibido", "verificado", "cancelado", "cancelado_proveedor", "pagado", "pendiente_por_pago"],
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
        }],
        validAdmin: {
            type: String,
            enum: ["Verificado", "por_verificar" , "con_error"],
            required: false,
        },
        noteValid: {
            type: String,
            required: false
        },
        usersAdmin: [{
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: false
        }],
        validDate: {
            type: Date,
            required: false
        },
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);

const OrderModel = model('orders', OrderSchema);
export default OrderModel;