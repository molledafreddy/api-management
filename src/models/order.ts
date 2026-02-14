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
        validAdmin: {
            type: String,
            enum: ['Verificado', 'por_Verificado', 'con_error'],
            required: false
        },
        validDate: {
            type: Date,
            default: Date.now,
            required: false
        },
        noteValid: {
            type: String,
            default: '',
            required: false
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