"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var LogisticOrderSchema = new mongoose_1.Schema({
    descriptionLogistic: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ["solicitado", "recibido", "no_recibido", "verificado", "cancelado", "cancelado_proveedor", "pagado", "pendiente_por_pago"],
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
var LogisticOrderModel = (0, mongoose_1.model)('logisticOrder', LogisticOrderSchema);
exports.default = LogisticOrderModel;
