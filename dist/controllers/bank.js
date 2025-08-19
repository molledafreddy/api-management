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
exports.deleteBank = exports.updateBank = exports.postBank = exports.getBank = exports.getBanks = void 0;
const bank_1 = require("../services/bank");
const error_handle_1 = require("../utils/error.handle");
const getBank = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params }, res) {
    try {
        const { id } = params;
        const response = yield (0, bank_1.getBank)(id);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_BANK");
    }
});
exports.getBank = getBank;
const getBanks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, bank_1.getBanks)();
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_BANKS");
    }
});
exports.getBanks = getBanks;
const postBank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, body } = req;
        body.users = `${user === null || user === void 0 ? void 0 : user._id}`;
        const responseOrder = yield (0, bank_1.insertBank)(body);
        res.send(responseOrder);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_POST_BANKS", e);
    }
});
exports.postBank = postBank;
const updateBank = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params, body }, res) {
    try {
        const { id } = params;
        const response = yield (0, bank_1.updateBank)(id, body);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_UPDATE_BANKS");
    }
});
exports.updateBank = updateBank;
const deleteBank = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params }, res) {
    try {
        const { id } = params;
        const response = yield (0, bank_1.deleteBank)(id);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_DELETE_BANKS");
    }
});
exports.deleteBank = deleteBank;
//# sourceMappingURL=bank.js.map