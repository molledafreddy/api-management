"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LogisticOrderSchema = new mongoose_1.Schema({
    descriptionLogistic: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ["requested", "received", "no_received", "verified", "cancelled", "cancelled_provider", "paid_out", "pending_for_payment"],
        required: true
    },
    orders: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'orders',
            required: true
        }],
    users: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        }],
    workingDay: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'workingDay',
            required: true
        }],
}, {
    timestamps: true,
    versionKey: false
});
const LogisticOrderModel = (0, mongoose_1.model)('logisticOrder', LogisticOrderSchema);
exports.default = LogisticOrderModel;
//# sourceMappingURL=logisticOrder.js.map