import  mongoose, { Schema, Types, model, Model } from "mongoose";
import { LogisticOrder } from "../interfaces/logistic-order.interface";

const LogisticOrderSchema: Schema = new Schema <LogisticOrder> (
    {
        descriptionLogistic: {
            type: String,
            required: false
        },
        status: {
            type: String,
            enum: ["solicitado", "recibido", "no_recibido", "verificado", "cancelado", "cancelado_proveedor", "pagado", "pendiente_por_pago"],
            required: true
        },
        orders: [{
            type: Schema.Types.ObjectId,
            ref: 'orders',
            required: true
        }],
        users: [{
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        }],
        workingDay: [{
            type: Schema.Types.ObjectId,
            ref: 'workingDay',
            required: true
        }],
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);

const LogisticOrderModel = model('logisticOrder', LogisticOrderSchema);
export default LogisticOrderModel;