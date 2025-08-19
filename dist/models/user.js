"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Schema, Types, model, Model } from "mongoose";
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
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
    }
}, {
    timestamps: true,
    versionKey: false
});
const UserModel = (0, mongoose_1.model)('users', UserSchema);
exports.default = UserModel;
//# sourceMappingURL=user.js.map