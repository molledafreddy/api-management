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
exports.deleteAccount = exports.updateAccount = exports.insertAccount = exports.getAccount = exports.getAccounts = void 0;
const account_1 = __importDefault(require("../models/account"));
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const getSearchAccount = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // const responseItem = await AccountModel.find({});
    // return responseItem;
    let valid = {};
    const search = query.search || null;
    const options = {
        populate: [{ path: 'providers' }, { path: 'banks' }],
        page: parseInt(query.page, 10) || 1,
        limit: parseInt(query.limit, 10) || 10
    };
    if (search != null) {
        valid = {
            $text: {
                $search: `\"${search}\" authority key`
            }
        };
    }
    const responseItem = yield account_1.default.paginate(valid, options);
    return responseItem;
});
const getAccounts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    let valid = {};
    const search = query.search || null;
    const options = {
        populate: [{ path: 'providers' }, { path: 'banks' }],
        page: parseInt(query.page, 10) || 1,
        limit: parseInt(query.limit, 10) || 10
    };
    if (search != null) {
        valid = { providers: search };
    }
    const responseItem = yield account_1.default.paginate(valid, options);
    return responseItem;
});
exports.getAccounts = getAccounts;
const getAccount = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield account_1.default.findOne({ _id: id });
    return responseItem;
});
exports.getAccount = getAccount;
const insertAccount = (account) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield account_1.default.create(account);
    return response;
});
exports.insertAccount = insertAccount;
const updateAccount = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield account_1.default.findOneAndUpdate({ _id: id }, data, { new: true });
    return responseItem;
});
exports.updateAccount = updateAccount;
const deleteAccount = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield account_1.default.remove({ _id: id });
    return responseItem;
});
exports.deleteAccount = deleteAccount;
//# sourceMappingURL=account.js.map