// import { Schema, Types, model, Model } from "mongoose";
import  mongoose, { Schema, Types, model, Model } from "mongoose";
// import { Account } from "../interfaces/account.interface";
import paginate from 'mongoose-paginate-v2';
import { DeliveryOrder } from "../interfaces/deliveryOrder.interface";

const DeliveryOrderSchema: Schema = new Schema <DeliveryOrder> (
    {
        nameClient: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: false,
        },
        phone: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            enum: ["activo", "procesando" , "entregado", "cancelado"],
            required: false,
        },
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);

DeliveryOrderSchema.plugin(paginate);

interface DeliveryOrderDocument extends mongoose.Document, DeliveryOrder {}

DeliveryOrderSchema.index({ 
    nameClient: 'text', 
    phone: 'text', 
    address: 'text',
    status: 'text',
});

const DeliveryOrderModel = mongoose.model<
DeliveryOrderDocument,
  mongoose.PaginateModel<DeliveryOrderDocument>
>('deliveryOrder', DeliveryOrderSchema, 'deliveryOrder');
DeliveryOrderModel.createIndexes();
export default DeliveryOrderModel;