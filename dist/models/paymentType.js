"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Schema, Types, model, Model } from "mongoose";
const mongoose_1 = require("mongoose");
const PaymentTypeSchema = new mongoose_1.Schema({
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
const PaymentTypeModel = (0, mongoose_1.model)('PaymentType', PaymentTypeSchema);
exports.default = PaymentTypeModel;
//# sourceMappingURL=paymentType.js.map