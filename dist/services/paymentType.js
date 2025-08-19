"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaymentType = exports.updatePaymentType = exports.insertPaymentType = exports.getPaymentType = exports.getPaymentTypes = void 0;
const paymentType_1 = __importDefault(require("../models/paymentType"));
const getPaymentTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield paymentType_1.default.find({});
    return responseItem;
});
exports.getPaymentTypes = getPaymentTypes;
const getPaymentType = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield paymentType_1.default.findOne({ _id: id });
    return responseItem;
});
exports.getPaymentType = getPaymentType;
const insertPaymentType = (account) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield paymentType_1.default.create(account);
    return response;
});
exports.insertPaymentType = insertPaymentType;
const updatePaymentType = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield paymentType_1.default.findOneAndUpdate({ _id: id }, data, { new: true });
    return responseItem;
});
exports.updatePaymentType = updatePaymentType;
const deletePaymentType = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield paymentType_1.default.remove({ _id: id });
    return responseItem;
});
exports.deletePaymentType = deletePaymentType;
//# sourceMappingURL=paymentType.js.map