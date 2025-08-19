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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = exports.updateAccount = exports.postAccount = exports.getAccount = exports.getAccounts = void 0;
const account_1 = require("../services/account");
const error_handle_1 = require("../utils/error.handle");
const getAccount = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params }, res) {
    try {
        const { id } = params;
        const response = yield (0, account_1.getAccount)(id);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_ACCOUNT");
    }
});
exports.getAccount = getAccount;
const getAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('getAccounts', req.query)
        const query = req.query;
        const response = yield (0, account_1.getAccounts)(query);
        res.send(response);
    }
    catch (e) {
        console.log('error', e);
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_ACCOUNTS");
    }
});
exports.getAccounts = getAccounts;
const postAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, body } = req;
        body.users = `${user === null || user === void 0 ? void 0 : user._id}`;
        const responseOrder = yield (0, account_1.insertAccount)(body);
        res.send(responseOrder);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_POST_ACCOUNTS", e);
    }
});
exports.postAccount = postAccount;
const updateAccount = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params, body }, res) {
    try {
        const { id } = params;
        const response = yield (0, account_1.updateAccount)(id, body);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_UPDATE_ACCOUNTS");
    }
});
exports.updateAccount = updateAccount;
const deleteAccount = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params }, res) {
    try {
        const { id } = params;
        const response = yield (0, account_1.deleteAccount)(id);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_DELETE_ITEMS");
    }
});
exports.deleteAccount = deleteAccount;
//# sourceMappingURL=account.js.map