// import { Schema, Types, model, Model } from "mongoose";
import  mongoose, { Schema, Types, model, Model } from "mongoose";
import { Account } from "../interfaces/account.interface";
import paginate from 'mongoose-paginate-v2';

const AccountSchema: Schema = new Schema <Account> (
    {
        number: {
            type: String,
            required: true,
        },
        rut: {
            type: String,
            required: false,
        },
        type: {
            type: String,
            enum: ["corriente", "vista", "ahorro", "rut"],
            required:true,
        },
        email: {
            type: String
        },
        banks: [{
            type: Schema.Types.ObjectId,
            ref: 'banks'
        }],
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

AccountSchema.plugin(paginate);

interface accountDocument extends mongoose.Document, Account {}

AccountSchema.index({ 
    type: 'text', 
    email: 'text', 
    banks: 'text',
    providers: 'text',
});

const AccountModel = mongoose.model<
accountDocument,
  mongoose.PaginateModel<accountDocument>
>('accounts', AccountSchema, 'accounts');
AccountModel.createIndexes();
export default AccountModel;