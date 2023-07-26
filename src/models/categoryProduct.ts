// import { Schema, Types, model, Model } from "mongoose";
import  mongoose, { Schema, Types, model, Model } from "mongoose";
import paginate from 'mongoose-paginate-v2';
import { CategoryProduct } from "../interfaces/categoryProduct.interface";

const CategoryProductSchema: Schema = new Schema <CategoryProduct> (
    {
        name: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
        }
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);

CategoryProductSchema.plugin(paginate);

interface CategoryProductDocument extends mongoose.Document, CategoryProduct {}

// CategoryProductSchema.index({ 
//     type: 'text', 
//     email: 'text', 
//     banks: 'text',
//     providers: 'text',
// });

const CategoryProductModel = mongoose.model<
CategoryProductDocument,
  mongoose.PaginateModel<CategoryProductDocument>
>('categoryProducts', CategoryProductSchema, 'categoryProducts');
CategoryProductModel.createIndexes();
export default CategoryProductModel;