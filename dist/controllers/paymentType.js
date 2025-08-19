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
exports.deletePaymentType = exports.updatePaymentType = exports.postPaymentType = exports.getPaymentType = exports.getPaymentTypes = void 0;
const paymentType_1 = require("../services/paymentType");
const error_handle_1 = require("../utils/error.handle");
const getPaymentType = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params }, res) {
    try {
        const { id } = params;
        const response = yield (0, paymentType_1.getPaymentType)(id);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_PAYMENTTYPE");
    }
});
exports.getPaymentType = getPaymentType;
const getPaymentTypes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, paymentType_1.getPaymentTypes)();
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_PAYMENTTYPES");
    }
});
exports.getPaymentTypes = getPaymentTypes;
const postPaymentType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, body } = req;
        body.users = `${user === null || user === void 0 ? void 0 : user._id}`;
        const responseOrder = yield (0, paymentType_1.insertPaymentType)(body);
        res.send(responseOrder);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_POST_PAYMENTTYPES", e);
    }
});
exports.postPaymentType = postPaymentType;
const updatePaymentType = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params, body }, res) {
    try {
        const { id } = params;
        const response = yield (0, paymentType_1.updatePaymentType)(id, body);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_UPDATE_PAYMENTTYPES");
    }
});
exports.updatePaymentType = updatePaymentType;
const deletePaymentType = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params }, res) {
    try {
        const { id } = params;
        const response = yield (0, paymentType_1.deletePaymentType)(id);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_DELETE_PAYMENTTYPES");
    }
});
exports.deletePaymentType = deletePaymentType;
//# sourceMappingURL=paymentType.js.map