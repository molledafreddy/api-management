"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Schema, Types, model, Model } from "mongoose";
const mongoose_1 = require("mongoose");
const WorkingDaySchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ["normal", "holiday", "inalienable"],
        required: true,
        unique: false,
    },
    created: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    versionKey: false
});
const workingDayModel = (0, mongoose_1.model)('workingDay', WorkingDaySchema);
exports.default = workingDayModel;
//# sourceMappingURL=workingDay.js.map