import  mongoose, { Schema, Types, model, Model } from "mongoose";
import { Revenue } from "../interfaces/revenue.interface";

const RevenueSchema: Schema = new Schema <Revenue> (
    {
        type: {
            type: String,
            enum: ["other", "closing"],
            required: true,
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
        workingDay: [{
            type: Schema.Types.ObjectId,
            ref: 'workingDay',
            required: true
        }],
        files: {
            type: [],
            required: false
        }
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);

const RevenueModel = model('revenue', RevenueSchema);
export default RevenueModel;