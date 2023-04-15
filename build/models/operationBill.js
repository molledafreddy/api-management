"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
var OperationBillSchema = new mongoose_1.Schema({
    amount: {
        type: Number,
        required: false
    },
    type: {
        type: String,
        enum: ['salary',
            'administrative',
            'accountant',
            'investment',
            'light_service',
            'water_service',
            'common_expense',
            'decrease',
            'rent',
            'cleaning_products',
            'profits',
            'construction_materials',
            'workforce',
            'implements',
            'remodeling',
            'publicity',
            'innovation',
            'other'
        ],
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
    versionKey: false
});
OperationBillSchema.plugin(mongoose_paginate_v2_1.default);
OperationBillSchema.index({
    type: 'text',
    description: 'text'
});
var OperationBillModel = mongoose_1.default.model('operationBills', OperationBillSchema, 'operationBills');
OperationBillModel.createIndexes();
exports.default = OperationBillModel;
