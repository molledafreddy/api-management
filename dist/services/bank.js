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
exports.deleteBank = exports.updateBank = exports.insertBank = exports.getBank = exports.getBanks = void 0;
const bank_1 = __importDefault(require("../models/bank"));
const getBanks = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield bank_1.default.find({});
    return responseItem;
});
exports.getBanks = getBanks;
const getBank = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield bank_1.default.findOne({ _id: id });
    return responseItem;
});
exports.getBank = getBank;
const insertBank = (account) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield bank_1.default.create(account);
    return response;
});
exports.insertBank = insertBank;
const updateBank = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield bank_1.default.findOneAndUpdate({ _id: id }, data, { new: true });
    return responseItem;
});
exports.updateBank = updateBank;
const deleteBank = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield bank_1.default.remove({ _id: id });
    return responseItem;
});
exports.deleteBank = deleteBank;
//# sourceMappingURL=bank.js.map