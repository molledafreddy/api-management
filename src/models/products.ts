// import { Schema, Types, model, Model } from "mongoose";
import  mongoose, { Schema, Types, model, Model } from "mongoose";
// import { Account } from "../interfaces/account.interface";
import paginate from 'mongoose-paginate-v2';
import { Product } from "../interfaces/product.interface";

const ProductSchema: Schema = new Schema <Product> (
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        clasification: {
            type: String,
            enum: ["regular", "promotion"],
            required: false,
        },
        price: {
            type: String,
            required: false,
        },
        type: {
            type: String,
            enum: ["granel", "unidad"],
            required:true,
        },
        status: {
            type: Boolean,
            required:true,
        },
        categoryProducts: [{
            type: Schema.Types.ObjectId,
            ref: 'categoryProducts'
        }]
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);

ProductSchema.plugin(paginate);

interface ProductDocument extends mongoose.Document, Product {}

// ProductSchema.index({ 
//     name: 'text', 
//     price: 'text', 
//     type: 'text',
//     status: 'text',
// });

const ProductModel = mongoose.model<
ProductDocument,
  mongoose.PaginateModel<ProductDocument>
>('products', ProductSchema, 'products');
ProductModel.createIndexes();
export default ProductModel;