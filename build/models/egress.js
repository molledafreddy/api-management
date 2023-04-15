"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var EgressSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ["orders", "operationBills", "payroll"],
        required: true
    },
    paymentDate: {
        type: Date,
        required: false
    },
    invoiceNumber: {
        type: String,
        required: false
    },
    amount: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    files: {
        type: Array,
        required: false
    },
    orders: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'orders',
            required: false
        }],
    operationBills: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'operationBills',
            required: false
        }],
    payroll: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'payroll',
            required: false
        }]
}, {
    timestamps: true,
    versionKey: false
});
var EgressModel = (0, mongoose_1.model)('egress', EgressSchema);
exports.default = EgressModel;
