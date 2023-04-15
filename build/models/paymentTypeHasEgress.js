"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var paymentTypeHasEgressSchema = new mongoose_1.Schema({
    paymentAmount: {
        type: String,
        required: true
    },
    payments: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'PaymentType'
        }],
    egress: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'egress'
        }]
}, {
    timestamps: true,
    versionKey: false
});
var paymentTypeHasEgressModel = (0, mongoose_1.model)('paymentTypeHasEgress', paymentTypeHasEgressSchema);
exports.default = paymentTypeHasEgressModel;
