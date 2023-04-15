"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var DetailRevenueSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ["efectivo", "punto", "transferencia", "otros"],
        required: true
    },
    description: {
        type: String,
    },
    amount: {
        type: Number,
        required: true
    },
    revenues: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'revenues'
        }]
}, {
    timestamps: true,
    versionKey: false
});
var DetailRevenueModel = (0, mongoose_1.model)('detailRevenue', DetailRevenueSchema);
exports.default = DetailRevenueModel;
