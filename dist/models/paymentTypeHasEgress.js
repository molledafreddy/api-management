"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const paymentTypeHasEgressSchema = new mongoose_1.Schema({
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
const paymentTypeHasEgressModel = (0, mongoose_1.model)('paymentTypeHasEgress', paymentTypeHasEgressSchema);
exports.default = paymentTypeHasEgressModel;
//# sourceMappingURL=paymentTypeHasEgress.js.map