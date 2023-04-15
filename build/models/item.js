"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Schema, Types, model, Model } from "mongoose";
var mongoose_1 = require("mongoose");
var ItemSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    fuel: {
        type: String,
        enum: ["gasoline", "electric"],
        required: true
    },
    year: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false
});
var ItemModel = (0, mongoose_1.model)('items', ItemSchema);
exports.default = ItemModel;
