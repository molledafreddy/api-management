import  mongoose, { Schema, Types, model, Model } from "mongoose";
import { categoryHasProduct } from "../interfaces/category-has-product.interface";

const categoryHasProductSchema: Schema = new Schema <categoryHasProduct> (
    {
        products: [{
            type: Schema.Types.ObjectId,
            ref: 'products'
        }],
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

const categoryHasProductModel = model('categoryHasProduct', categoryHasProductSchema);
export default categoryHasProductModel;