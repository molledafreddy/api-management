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
// import { Schema, Types, model, Model } from "mongoose";
var mongoose_1 = __importStar(require("mongoose"));
var mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
var ProviderDaySchema = new mongoose_1.Schema({
    businessName: {
        type: String,
        required: true,
    },
    contactName: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    merchandiseType: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["distribuidor", "productor", "fabricante", "otros"],
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    rut: {
        type: String,
        required: true,
    },
    web: {
        type: String,
        required: false,
    },
    instagran: {
        type: String,
        required: false,
    },
    facebook: {
        type: String,
        required: false,
    },
    catalogue: {
        type: String,
        required: false,
    }
}, {
    timestamps: true,
    versionKey: false
});
ProviderDaySchema.plugin(mongoose_paginate_v2_1.default);
ProviderDaySchema.index({
    businessName: 'text',
    contactName: 'text',
    email: 'text',
    merchandiseType: 'text',
    rut: 'text',
    type: 'text',
});
var ProviderModel = mongoose_1.default.model('providers', ProviderDaySchema, 'providers');
ProviderModel.createIndexes();
exports.default = ProviderModel;
