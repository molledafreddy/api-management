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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOperationBills = exports.updateOperationBills = exports.postOperationBills = exports.getOperationBill = exports.getPaymentHasEgress = exports.getOperationBills = void 0;
var operationBill_1 = require("../services/operationBill");
var error_handle_1 = require("../utils/error.handle");
var getOperationBills = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, response, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                query = req.query;
                return [4 /*yield*/, (0, operationBill_1.getOperationBills)(query)];
            case 1:
                response = _a.sent();
                res.send(response);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.log('error', e_1);
                (0, error_handle_1.handleHttp)(res, "ERROR_GET_OPERATIONBILLS");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOperationBills = getOperationBills;
var getOperationBill = function (_a, res) {
    var params = _a.params;
    return __awaiter(void 0, void 0, void 0, function () {
        var id, responseItem, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    id = params.id;
                    return [4 /*yield*/, (0, operationBill_1.getOperationBill)(id)];
                case 1:
                    responseItem = _b.sent();
                    res.send(responseItem);
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _b.sent();
                    (0, error_handle_1.handleHttp)(res, "ERROR_GET_OPERATIONBILLS");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getOperationBill = getOperationBill;
var getPaymentHasEgress = function (_a, res) {
    var params = _a.params;
    return __awaiter(void 0, void 0, void 0, function () {
        var id, responseItem, e_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    id = params.id;
                    return [4 /*yield*/, (0, operationBill_1.getPaymentHasEgress)(id)];
                case 1:
                    responseItem = _b.sent();
                    res.send(responseItem);
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _b.sent();
                    (0, error_handle_1.handleHttp)(res, "ERROR_GET_PAYMENTHASEGRESS", e_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getPaymentHasEgress = getPaymentHasEgress;
// const searchOrderDetail = async ({body}: RequestExt, res: Response) => {
//   try {
//     console.log('llego al searchDetail')
//         // const {id} = params;
//         const  responseItem = await searchDetail(body);
//         console.log('responseItem', responseItem)
//         res.send(responseItem);
//   } catch (e) {
//     handleHttp(res, "ERROR_GET_ORDERS");
//   }
// };
var postOperationBills = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, body, files, valueOperation, paymentHasEgress, dataFiles, now, formatoMap, formatAmount, egress, reqOperation, responseOrder, response, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                console.log('req', req);
                user = req.user, body = req.body, files = req.files;
                body.users = "".concat(user === null || user === void 0 ? void 0 : user._id);
                valueOperation = JSON.parse(req.body.data);
                // res.send(body);
                // console.log('req.body', req.body.dataFiles)
                if (req.body.paymentHasEgress !== undefined) {
                    paymentHasEgress = JSON.parse(req.body.paymentHasEgress);
                }
                if (req.body.dataFiles !== undefined) {
                    dataFiles = JSON.parse(req.body.dataFiles);
                }
                now = new Date();
                formatoMap = {
                    dd: now.getDate(),
                    mm: now.getMonth() + 1,
                    yy: now.getFullYear().toString().slice(-2),
                    yyyy: now.getFullYear()
                };
                formatAmount = 0;
                if ((valueOperation === null || valueOperation === void 0 ? void 0 : valueOperation.amount) !== null && (valueOperation === null || valueOperation === void 0 ? void 0 : valueOperation.amount) !== undefined) {
                    formatAmount = valueOperation === null || valueOperation === void 0 ? void 0 : valueOperation.amount.toString().replace(/[$.,]/g, '');
                }
                egress = {
                    _id: valueOperation._idEgress,
                    invoiceNumber: valueOperation.invoiceNumber,
                    amount: formatAmount,
                    description: valueOperation.description,
                    paymentHasEgress: paymentHasEgress,
                    type: 'operationBills',
                    paymentDate: new Date(formatoMap.yyyy, formatoMap.mm - 1, formatoMap.dd, 12, 0, 0)
                };
                reqOperation = {
                    id: body === null || body === void 0 ? void 0 : body.id,
                    description: valueOperation.description,
                    amount: formatAmount,
                    egress: egress,
                    users: user === null || user === void 0 ? void 0 : user._id,
                    type: valueOperation.type,
                    files: files,
                    dataFiles: dataFiles,
                };
                if (!!valueOperation._id) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, operationBill_1.insertOperationBills)(reqOperation)];
            case 1:
                responseOrder = _a.sent();
                res.send(responseOrder);
                return [3 /*break*/, 4];
            case 2:
                console.log('llego al update');
                return [4 /*yield*/, (0, operationBill_1.updateOperationBills)(valueOperation._id, reqOperation)];
            case 3:
                response = _a.sent();
                res.send(response);
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                e_4 = _a.sent();
                (0, error_handle_1.handleHttp)(res, "ERROR_POST_OPERATIONBILLS", e_4);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.postOperationBills = postOperationBills;
var updateOperationBills = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, body, params, files, id, response, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.user, body = req.body, params = req.params, files = req.files;
                console.log('llego por aca body', req.body);
                id = params.id;
                return [4 /*yield*/, (0, operationBill_1.updateOperationBills)(id, body)];
            case 1:
                response = _a.sent();
                res.send(response);
                return [3 /*break*/, 3];
            case 2:
                e_5 = _a.sent();
                (0, error_handle_1.handleHttp)(res, "ERROR_UPDATE_OPERATIONBILLS");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateOperationBills = updateOperationBills;
var deleteOperationBills = function (_a, res) {
    var params = _a.params;
    return __awaiter(void 0, void 0, void 0, function () {
        var id, response, e_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    id = params.id;
                    return [4 /*yield*/, (0, operationBill_1.deleteOperationBills)(id)];
                case 1:
                    response = _b.sent();
                    res.send(response);
                    return [3 /*break*/, 3];
                case 2:
                    e_6 = _b.sent();
                    (0, error_handle_1.handleHttp)(res, "ERROR_DELETE_OPERATIONBILLS");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.deleteOperationBills = deleteOperationBills;
