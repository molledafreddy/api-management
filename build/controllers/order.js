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
exports.consultStatusOrder = exports.postOrder = exports.searchOrderDetail = exports.searchOrderPaitOut = exports.getOrderDetail = exports.getOrder = exports.getOrders = void 0;
var order_1 = require("../services/order");
var error_handle_1 = require("../utils/error.handle");
var getOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, order_1.getOrders)()];
            case 1:
                response = _a.sent();
                res.send(response);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                (0, error_handle_1.handleHttp)(res, "ERROR_GET_ORDERS");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOrders = getOrders;
var getOrder = function (_a, res) {
    var params = _a.params;
    return __awaiter(void 0, void 0, void 0, function () {
        var id, responseItem, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    id = params.id;
                    return [4 /*yield*/, (0, order_1.getOrder)(id)];
                case 1:
                    responseItem = _b.sent();
                    res.send(responseItem);
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _b.sent();
                    (0, error_handle_1.handleHttp)(res, "ERROR_GET_ORDERS");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getOrder = getOrder;
var getOrderDetail = function (_a, res) {
    var params = _a.params;
    return __awaiter(void 0, void 0, void 0, function () {
        var id, responseItem, e_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    console.log('llego al getOrderDetail');
                    id = params.id;
                    return [4 /*yield*/, (0, order_1.getOrderDetail)(id)];
                case 1:
                    responseItem = _b.sent();
                    res.send(responseItem);
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _b.sent();
                    (0, error_handle_1.handleHttp)(res, "ERROR_GET_ORDERS");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getOrderDetail = getOrderDetail;
var searchOrderPaitOut = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, responseItem, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                query = req.query;
                return [4 /*yield*/, (0, order_1.searchOrderPaitOut)(query)];
            case 1:
                responseItem = _a.sent();
                // console.log('responseItem', responseItem)
                res.send(responseItem);
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                console.log('e', e_4);
                (0, error_handle_1.handleHttp)(res, "ERROR_GET__SEARCH_ORDERS");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.searchOrderPaitOut = searchOrderPaitOut;
var searchOrderDetail = function (_a, res) {
    var body = _a.body;
    return __awaiter(void 0, void 0, void 0, function () {
        var responseItem, e_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, order_1.searchOrderDetail)(body)];
                case 1:
                    responseItem = _b.sent();
                    // console.log('responseItem', responseItem)
                    res.send(responseItem);
                    return [3 /*break*/, 3];
                case 2:
                    e_5 = _b.sent();
                    console.log('e', e_5);
                    (0, error_handle_1.handleHttp)(res, "ERROR_GET__SEARCH_ORDERS");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.searchOrderDetail = searchOrderDetail;
var consultStatusOrder = function (_a, res) {
    var params = _a.params;
    return __awaiter(void 0, void 0, void 0, function () {
        var id, responseItem, e_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    id = params.id;
                    return [4 /*yield*/, (0, order_1.validOrderProvider)(id)];
                case 1:
                    responseItem = _b.sent();
                    res.send(responseItem);
                    return [3 /*break*/, 3];
                case 2:
                    e_6 = _b.sent();
                    (0, error_handle_1.handleHttp)(res, "ERROR_GET_ORDERS");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.consultStatusOrder = consultStatusOrder;
var postOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, body, files, valueOrder, paymentHasEgress, dataFiles, formatEstimatedAmount, egress, requestO, responseOrder, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.user, body = req.body, files = req.files;
                body.users = "".concat(user === null || user === void 0 ? void 0 : user._id);
                console.log('user', user);
                valueOrder = JSON.parse(req.body.data);
                paymentHasEgress = [];
                if (req.body.paymentHasEgress !== undefined) {
                    paymentHasEgress = JSON.parse(req.body.paymentHasEgress);
                }
                dataFiles = [];
                if (req.body.dataFiles !== undefined) {
                    dataFiles = JSON.parse(req.body.dataFiles);
                }
                formatEstimatedAmount = 0;
                // console.log('valueOrder.amount', valueOrder)
                // res.send(valueOrder);
                if ((valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.estimatedAmount) !== null && (valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.estimatedAmount) !== undefined) {
                    formatEstimatedAmount = valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.estimatedAmount.toString().replace(/[$,]/g, '');
                }
                egress = {
                    _id: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder._idEgress,
                    paymentDate: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.paymentDate,
                    invoiceNumber: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.invoiceNumber,
                    amount: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.amount,
                    description: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.descriptionPayment,
                    paymentHasEgress: paymentHasEgress,
                    type: 'orders',
                };
                requestO = {
                    _id: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder._id,
                    paymentDate: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.paymentDate,
                    receptionDate: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.receptionDate,
                    EstimateReceptionDate: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.estimateReceptionDate,
                    creditPaymentDate: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.creditPaymentDate,
                    amountPaid: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.amount,
                    invoiceNumber: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.invoiceNumber,
                    orderDate: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.orderDate,
                    descriptionOrder: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.descriptionOrder,
                    descriptionPayment: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.descriptionPayment,
                    descriptionLogistic: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.descriptionLogistic,
                    status: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.status,
                    estimatedAmount: formatEstimatedAmount,
                    providers: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.providers,
                    paymentMethod: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.paymentMethod,
                    files: files,
                    dataFiles: dataFiles,
                    egress: egress,
                    users: user,
                    type: 'orders',
                };
                return [4 /*yield*/, (0, order_1.insertOrUpdateOrder)(requestO)];
            case 1:
                responseOrder = _a.sent();
                res.send(responseOrder);
                return [3 /*break*/, 3];
            case 2:
                e_7 = _a.sent();
                console.log('error', e_7);
                (0, error_handle_1.handleHttp)(res, "ERROR_POST_ORDERS", e_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.postOrder = postOrder;
