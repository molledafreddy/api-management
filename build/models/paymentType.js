"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Schema, Types, model, Model } from "mongoose";
var mongoose_1 = require("mongoose");
var PaymentTypeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
});
var PaymentTypeModel = (0, mongoose_1.model)('PaymentType', PaymentTypeSchema);
exports.default = PaymentTypeModel;
