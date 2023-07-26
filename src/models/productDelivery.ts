import  mongoose, { Schema, Types, model, Model } from "mongoose";
import paginate from 'mongoose-paginate-v2';
import { ProductDelivery } from "../interfaces/product-delivery.interface";

const productDeliverySchema: Schema = new Schema <ProductDelivery> (
    {
        price: {
            type: String,
            required: false,
        },
        quantity: {
            type: String,
            required: false,
        },
        products: [{
            type: Schema.Types.ObjectId,
            ref: 'products'
        }],
        deliveryOrder: [{
            type: Schema.Types.ObjectId,
            ref: 'deliveryOrder'
        }]
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);

productDeliverySchema.plugin(paginate);

interface ProductDeliveryDocument extends mongoose.Document, ProductDelivery {}

productDeliverySchema.index({ 
    price: 'text', 
    quantity: 'text',
});

const ProductDeliveryModel = mongoose.model<
ProductDeliveryDocument,
  mongoose.PaginateModel<ProductDeliveryDocument>
>('productDelivery', productDeliverySchema, 'productDelivery');
ProductDeliveryModel.createIndexes();
export default ProductDeliveryModel;