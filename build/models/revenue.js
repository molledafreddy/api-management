"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var RevenueSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ["other", "closure"],
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
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'turns',
            required: false
        }],
    users: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'users',
            required: false
        }],
    workingDay: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'workingDay',
            required: true
        }],
    files: {
        type: [],
        required: false
    }
}, {
    timestamps: true,
    versionKey: false
});
var RevenueModel = (0, mongoose_1.model)('revenue', RevenueSchema);
exports.default = RevenueModel;
