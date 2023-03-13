// import { Schema, Types, model, Model } from "mongoose";
import  mongoose, { Schema, Types, model, Model } from "mongoose";
import { Provider } from "../interfaces/provider.interface";
import paginate from 'mongoose-paginate-v2';

const ProviderDaySchema: Schema = new Schema <Provider> (
    {
        businessName: {
            type: String,
            required: true,
        },
        contactName: {
            type: String,
            required: false,
        },
        phone: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: false,
        },
        address: {
            type: String,
            required: false,
        },
        merchandiseType: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["distribuidor", "productor", "fabricante", "otros"],
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        rut: {
            type: String,
            required: true,
        },
        web: {
            type: String,
            required: false,
        },
        instagran: {
            type: String,
            required: false,
        },
        facebook: {
            type: String,
            required: false,
        },
        catalogue: {
            type: String,
            required: false,
        }
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);

ProviderDaySchema.plugin(paginate);

interface providerDocument extends mongoose.Document, Provider {}

ProviderDaySchema.index({ 
    businessName: 'text', 
    contactName: 'text', 
    email: 'text',
    merchandiseType: 'text',
    rut: 'text',
    type: 'text',
});

const ProviderModel = mongoose.model<
providerDocument,
  mongoose.PaginateModel<providerDocument>
>('providers', ProviderDaySchema, 'providers');
ProviderModel.createIndexes();
export default ProviderModel;