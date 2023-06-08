import  mongoose, { Schema, Types, model, Model } from "mongoose";
import { Revenue } from "../interfaces/revenue.interface";

const RevenueSchema: Schema = new Schema <Revenue> (
    {
        type: {
            type: String,
            enum: ["other", "closure"],
            required: true,
        },
        validAdmin: {
            type: String,
            enum: ["Verificado", "por_verificar" , "con_error"],
            required: false,
        },
        amountPos: {
            type: Number,
            required: false
        },
        amountCash: {
            type: Number,
            required: false
        },
        amountTransfer: {
            type: Number,
            required: false
        },
        amountOther: {
            type: Number,
            required: false
        },
        amountSistem: {
            type: Number,
            required: false
        },
        description: {
            type: String,
        },
        noteValid: {
            type: String,
            required: false
        },
        totalAmount: {
            type: Number,
            required: false
        },
        cashFund: {
            type: Number,
            required: false
        },
        turn: [{
            type: Schema.Types.ObjectId,
            ref: 'turns',
            required: false
        }],
        users: [{
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: false
        }],
        usersAdmin: [{
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: false
        }],
        workingDay: [{
            type: Schema.Types.ObjectId,
            ref: 'workingDay',
            required: true
        }],
        files: {
            type: [],
            required: false
        },
        validDate: {
            type: Date,
            required: false
        },
        createdDate: {
            type: Date,
            required: false
        },
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);

const RevenueModel = model('revenue', RevenueSchema);
export default RevenueModel;