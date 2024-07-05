"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Schema, Types, model, Model } from "mongoose";
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        default: "soy la descripcion",
    },
    role: {
        type: String,
        default: 'User',
        required: true
    },
    phone: {
        type: String,
        unique: false,
        required: false
    },
}, {
    timestamps: true,
    versionKey: false
});
var UserModel = (0, mongoose_1.model)('users', UserSchema);
exports.default = UserModel;
