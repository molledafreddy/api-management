"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Schema, Types, model, Model } from "mongoose";
const mongoose_1 = require("mongoose");
const BankSchema = new mongoose_1.Schema({
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
const BankModel = (0, mongoose_1.model)('banks', BankSchema);
exports.default = BankModel;
//# sourceMappingURL=bank.js.map