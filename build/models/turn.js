"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Schema, Types, model, Model } from "mongoose";
var mongoose_1 = require("mongoose");
var TurnSchema = new mongoose_1.Schema({
    startDate: {
        type: Date
    },
    endDate: {
        type: Date,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Active", "Stop", "completed"],
    },
    statusPayment: {
        type: String,
        enum: ["Paid", "In_verification", "verified", "Canceled", "Not_Payed"],
    },
    type: {
        type: String,
        enum: ["normal", "full", "partial"],
        required: true
    },
    users: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        }],
    paymentDate: {
        type: Date,
    },
    workingDay: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'workingDay',
            required: true
        }]
}, {
    timestamps: true,
    versionKey: false
});
var TurnModel = (0, mongoose_1.model)('turns', TurnSchema);
exports.default = TurnModel;
