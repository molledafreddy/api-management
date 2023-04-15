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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOperationBills = exports.updateOperationBills = exports.getOperationBill = exports.getOperationBills = exports.getPaymentHasEgress = exports.insertOperationBills = void 0;
var operationBill_1 = __importDefault(require("../models/operationBill"));
var egress_1 = __importDefault(require("../models/egress"));
var paymentTypeHasEgress_1 = __importDefault(require("../models/paymentTypeHasEgress"));
var mongoose_1 = __importDefault(require("mongoose"));
var paymentType_1 = require("./paymentType");
var insertOperationBills = function (operation) { return __awaiter(void 0, void 0, void 0, function () {
    var value, dataFiles, responseInsert, resultEgress;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                value = validPaidOperation(operation);
                if (value != "VALID_SUCCESS") {
                    return [2 /*return*/, value];
                }
                dataFiles = [];
                // console.log('archivos', operation.files)
                if (Object.keys(operation.files).length > 0) {
                    (_a = operation.files) === null || _a === void 0 ? void 0 : _a.forEach(function (element) {
                        // console.log('element',element)
                        dataFiles.push({
                            path: element.path,
                            pathView: "".concat(process.cwd(), "/storage/").concat(element.filename),
                            filename: element.filename,
                            size: element.size,
                            mimetype: element.mimetype
                        });
                    });
                    operation.files = dataFiles;
                }
                return [4 /*yield*/, operationBill_1.default.create(operation)];
            case 1:
                responseInsert = _b.sent();
                // console.log('dresponseInsert', responseInsert)
                // return responseInsert;
                if (responseInsert._id != undefined) {
                    resultEgress = createEgress(responseInsert._id, operation);
                    // return resultEgress;
                }
                console.log('responseInsert operation bills', responseInsert);
                return [2 /*return*/, responseInsert];
        }
    });
}); };
exports.insertOperationBills = insertOperationBills;
var validPaidOperation = function (operation) {
    if ((operation === null || operation === void 0 ? void 0 : operation.amount) <= 0) {
        return "NOT_FOUND_AMOUNT";
    }
    if (operation.egress == undefined || Object.entries(operation.egress).length == 0) {
        return "NOT_FOUND_DATA_EGRESS";
    }
    if (operation.egress.paymentHasEgress == undefined || Object.entries(operation.egress.paymentHasEgress).length == 0) {
        return "NOT_FOUND_DATA_PAYMENT_HAS_EGRESS";
    }
    var valueAmount = 0;
    valueAmount = operation.egress.paymentHasEgress.filter(function (d) { return parseInt(d.paymentAmount); }).map(function (d) { return parseInt(d.paymentAmount); }).reduce(function (a, b) { return a + b; }, 0);
    if (valueAmount != operation.amount) {
        return "AMOUNT_DISTINC_SUM_PAYMENT_EGRESS";
    }
    return "VALID_SUCCESS";
};
var createEgress = function (operationId, data) { return __awaiter(void 0, void 0, void 0, function () {
    var validEgress, dataEgress, responseInsertE_1, resultPayments_1, dataPayment_1, responseInsertP;
    var _a, _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0: return [4 /*yield*/, getEgress(operationId)
                // console.log('validEgress', validEgress)
            ];
            case 1:
                validEgress = _f.sent();
                if (!(Object.keys(validEgress).length == 0)) return [3 /*break*/, 7];
                console.log("ingreso se creara un abono");
                console.log("ingreso se creara un abono");
                console.log("ingreso se creara un abono");
                console.log("ingreso se creara un abono", data === null || data === void 0 ? void 0 : data.files);
                dataEgress = {
                    invoiceNumber: (_a = data.egress) === null || _a === void 0 ? void 0 : _a.invoiceNumber,
                    operationBills: operationId,
                    description: data === null || data === void 0 ? void 0 : data.description,
                    amount: data === null || data === void 0 ? void 0 : data.amount,
                    files: data === null || data === void 0 ? void 0 : data.files,
                    type: 'operationBills',
                    paymentDate: (_b = data.egress) === null || _b === void 0 ? void 0 : _b.paymentDate
                };
                return [4 /*yield*/, egress_1.default.create(dataEgress)];
            case 2:
                responseInsertE_1 = _f.sent();
                if (!((responseInsertE_1 === null || responseInsertE_1 === void 0 ? void 0 : responseInsertE_1._id) != undefined && Object.keys((_c = data.egress) === null || _c === void 0 ? void 0 : _c.paymentHasEgress).length > 0)) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, paymentType_1.getPaymentTypes)()];
            case 3:
                resultPayments_1 = _f.sent();
                if (!(Object.keys(resultPayments_1).length > 0)) return [3 /*break*/, 6];
                dataPayment_1 = [];
                return [4 /*yield*/, ((_e = (_d = data.egress) === null || _d === void 0 ? void 0 : _d.paymentHasEgress) === null || _e === void 0 ? void 0 : _e.forEach(function (item) {
                        for (var i = 0; i < resultPayments_1.length; i++) {
                            var type = resultPayments_1[i];
                            if (type.name === item.payments) {
                                item.payments = type._id;
                            }
                        }
                        var dataPaymentTypeHasEgress = {
                            payments: item.payments,
                            egress: responseInsertE_1._id,
                            paymentAmount: item.paymentAmount,
                        };
                        dataPayment_1.push(dataPaymentTypeHasEgress);
                    }))];
            case 4:
                _f.sent();
                return [4 /*yield*/, paymentTypeHasEgress_1.default.insertMany(dataPayment_1)];
            case 5:
                responseInsertP = _f.sent();
                console.log('responseInsertP', responseInsertP);
                _f.label = 6;
            case 6: return [2 /*return*/, dataEgress];
            case 7: return [2 /*return*/];
        }
    });
}); };
var updateEgress = function (operationId, data) { return __awaiter(void 0, void 0, void 0, function () {
    var validEgress, dataEgress, infoFile_1, responseInsertE, deleteI, resultPayments_2, dataPayment_2, responseInsertP;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                console.log('valor', data);
                return [4 /*yield*/, getEgress(operationId)
                    // console.log('validEgress', validEgress)
                ];
            case 1:
                validEgress = _k.sent();
                if (!(Object.keys(validEgress).length == 0)) return [3 /*break*/, 13];
                // console.log("ingreso se creara un abono")
                // console.log("ingreso se creara un abono")
                console.log("ingreso se creara un abono data?.dataFiles", data === null || data === void 0 ? void 0 : data.dataFiles);
                console.log("ingreso se creara un abono data?.files", data === null || data === void 0 ? void 0 : data.files);
                dataEgress = {
                    invoiceNumber: (_a = data.egress) === null || _a === void 0 ? void 0 : _a.invoiceNumber,
                    operationBills: operationId,
                    description: data === null || data === void 0 ? void 0 : data.description,
                    amount: data === null || data === void 0 ? void 0 : data.amount,
                    type: 'operationBills',
                };
                infoFile_1 = [];
                if (!(Object.keys(data === null || data === void 0 ? void 0 : data.dataFiles).length > 0 && Object.keys(data === null || data === void 0 ? void 0 : data.files).length > 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, ((_b = data === null || data === void 0 ? void 0 : data.dataFiles) === null || _b === void 0 ? void 0 : _b.forEach(function (element) {
                        infoFile_1.push({
                            filename: element.filename,
                            path: element.path,
                            pathView: "".concat(process.cwd(), "/storage/").concat(element.filename),
                            size: element.size,
                            mimetype: element.mimetype
                        });
                    }))];
            case 2:
                _k.sent();
                return [4 /*yield*/, ((_c = data === null || data === void 0 ? void 0 : data.files) === null || _c === void 0 ? void 0 : _c.forEach(function (element) {
                        infoFile_1.push({
                            filename: element.filename,
                            path: element.path,
                            pathView: "".concat(process.cwd(), "/storage/").concat(element.filename),
                            size: element.size,
                            mimetype: element.mimetype
                        });
                    }))];
            case 3:
                _k.sent();
                console.log('infoFiles', infoFile_1);
                // infoFile.push(data?.files as any);
                dataEgress.files = infoFile_1;
                return [3 /*break*/, 7];
            case 4:
                if (!(Object.keys(data === null || data === void 0 ? void 0 : data.files).length > 0)) return [3 /*break*/, 5];
                dataEgress.files = data.files;
                return [3 /*break*/, 7];
            case 5:
                if (!(Object.keys(data === null || data === void 0 ? void 0 : data.dataFiles).length > 0)) return [3 /*break*/, 7];
                return [4 /*yield*/, ((_d = data === null || data === void 0 ? void 0 : data.dataFiles) === null || _d === void 0 ? void 0 : _d.forEach(function (element) {
                        infoFile_1.push({
                            filename: element.filename,
                            path: element.path,
                            pathView: "".concat(process.cwd(), "/storage/").concat(element.filename),
                            size: element.size,
                            mimetype: element.mimetype
                        });
                    }))];
            case 6:
                _k.sent();
                dataEgress.files = infoFile_1;
                _k.label = 7;
            case 7:
                console.log("dataEgress", dataEgress);
                return [4 /*yield*/, egress_1.default.findOneAndUpdate({ _id: (_e = data === null || data === void 0 ? void 0 : data.egress) === null || _e === void 0 ? void 0 : _e._id }, dataEgress, { new: true })];
            case 8:
                responseInsertE = _k.sent();
                return [4 /*yield*/, paymentTypeHasEgress_1.default.deleteMany({ egress: (_f = data === null || data === void 0 ? void 0 : data.egress) === null || _f === void 0 ? void 0 : _f._id })];
            case 9:
                deleteI = _k.sent();
                if (!(Object.keys((_g = data.egress) === null || _g === void 0 ? void 0 : _g.paymentHasEgress).length > 0)) return [3 /*break*/, 13];
                return [4 /*yield*/, (0, paymentType_1.getPaymentTypes)()];
            case 10:
                resultPayments_2 = _k.sent();
                if (!(Object.keys(resultPayments_2).length > 0)) return [3 /*break*/, 13];
                dataPayment_2 = [];
                return [4 /*yield*/, ((_j = (_h = data.egress) === null || _h === void 0 ? void 0 : _h.paymentHasEgress) === null || _j === void 0 ? void 0 : _j.forEach(function (item) {
                        var _a;
                        for (var i = 0; i < resultPayments_2.length; i++) {
                            var type = resultPayments_2[i];
                            if (type.name === item.payments) {
                                item.payments = type._id;
                            }
                        }
                        // 641b70dd865328bce57e31e8
                        var dataPaymentTypeHasEgress = {
                            payments: item.payments,
                            egress: (_a = data === null || data === void 0 ? void 0 : data.egress) === null || _a === void 0 ? void 0 : _a._id,
                            paymentAmount: item.paymentAmount,
                        };
                        dataPayment_2.push(dataPaymentTypeHasEgress);
                    }))];
            case 11:
                _k.sent();
                return [4 /*yield*/, paymentTypeHasEgress_1.default.insertMany(dataPayment_2)];
            case 12:
                responseInsertP = _k.sent();
                console.log('responseInsertP', responseInsertP);
                _k.label = 13;
            case 13: return [2 /*return*/];
        }
    });
}); };
var getEgress = function (orderId) { return __awaiter(void 0, void 0, void 0, function () {
    var resp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, egress_1.default.find({
                    orders: orderId
                })];
            case 1:
                resp = _a.sent();
                return [2 /*return*/, resp];
        }
    });
}); };
var getOperationBills = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var valid, search, page, limit, startDate, endDate, response, dataStartDate, dataEndDate, dateStr, nextDate, responseItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                valid = {};
                search = query.search || null;
                page = parseInt(query.page, 10) || 1;
                limit = parseInt(query.limit, 10) || 10;
                startDate = query.startDate || '';
                endDate = query.endDate || '';
                response = {
                    docs: [],
                    totalDocs: 0,
                    limit: limit,
                    totalPages: 0,
                    page: 1,
                    pagingCounter: 1,
                    hasPrevPage: false,
                    hasNextPage: true,
                    prevPage: null,
                    nextPage: 0
                };
                if (search != null) {
                    valid = {
                        $text: {
                            $search: "\"".concat(search, "\" authority key")
                        },
                    };
                }
                if ((startDate !== '' && endDate !== '')) {
                    dataStartDate = startDate.split("/");
                    dataEndDate = endDate.split("/");
                    dateStr = new Date(dataStartDate[2], dataStartDate[0] - 1, dataStartDate[1], 0, 0, 0, 0);
                    nextDate = new Date(dataEndDate[2], dataEndDate[0] - 1, dataEndDate[1], 23, 59, 59, 999);
                    valid.createdAt = {
                        $gte: dateStr, $lt: nextDate
                    };
                }
                return [4 /*yield*/, operationBill_1.default.aggregate([
                        { $match: valid },
                        { $lookup: { from: 'egresses', localField: '_id', foreignField: 'operationBills', as: 'egress' } },
                        {
                            $setWindowFields: {
                                output: {
                                    totalDocs: { $count: {} },
                                },
                            },
                        },
                        { $skip: (page - 1) * limit || 0 },
                        { $limit: Number(limit) },
                    ])];
            case 1:
                responseItem = _a.sent();
                if (Object.entries(responseItem).length > 0) {
                    console.log('');
                    response.docs = responseItem;
                    response.totalDocs = responseItem[0].totalDocs;
                    response.limit = limit;
                    response.totalPages = Math.ceil(responseItem[0].totalDocs / limit);
                    response.page = (page - 1) * limit || 0;
                    response.prevPage = page;
                    response.nextPage = (page + 1);
                }
                return [2 /*return*/, response];
        }
    });
}); };
exports.getOperationBills = getOperationBills;
var getPaymentHasEgress = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var responseItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, paymentTypeHasEgress_1.default.find({ egress: id })
                    .populate('payments')];
            case 1:
                responseItem = _a.sent();
                return [2 /*return*/, responseItem];
        }
    });
}); };
exports.getPaymentHasEgress = getPaymentHasEgress;
var getOperationBill = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var valid, response, ObjectId, responseItem, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                valid = {};
                response = {
                    docs: [],
                    totalDocs: 0,
                    limit: 1,
                    totalPages: 0,
                    page: 1,
                    pagingCounter: 1,
                    hasPrevPage: false,
                    hasNextPage: true,
                    prevPage: null,
                    nextPage: 0
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                ObjectId = mongoose_1.default.Types.ObjectId;
                // 63ec10592073ceeccba8bf9e
                valid = { _id: new ObjectId(id) };
                // valid = {"_id":{$eq:new ObjectId("63f7ebee0e2be4525a156238")}}
                // valid = {type: 'cleaning_products'};
                console.log('llego por aca', valid);
                return [4 /*yield*/, operationBill_1.default.aggregate([
                        { $match: valid },
                        // {$match: { _id: new ObjectId("63f7ebee0e2be4525a156238") }},
                        { $lookup: { from: 'egresses', localField: '_id', foreignField: 'operationBills', as: 'egress' } },
                    ])];
            case 2:
                responseItem = _a.sent();
                // const responseItem = await OperationBillSchemaModel.findOne({id}).populate('operationBills');
                // return responseItem;
                console.log('dataresponseItem', responseItem);
                if (Object.entries(responseItem).length > 0) {
                    response.docs = responseItem;
                }
                return [2 /*return*/, response];
            case 3:
                error_1 = _a.sent();
                console.log('error', error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getOperationBill = getOperationBill;
var updateOperationBills = function (id, operation) { return __awaiter(void 0, void 0, void 0, function () {
    var value, dataFiles, responseInsert, resultEgress;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                value = validPaidOperation(operation);
                if (value != "VALID_SUCCESS") {
                    return [2 /*return*/, value];
                }
                dataFiles = [];
                if (Object.keys(operation.files).length > 0) {
                    (_a = operation.files) === null || _a === void 0 ? void 0 : _a.forEach(function (element) {
                        // console.log('element',element)
                        dataFiles.push({
                            path: element.path,
                            pathView: "".concat(process.cwd(), "/storage/").concat(element.filename),
                            filename: element.filename,
                            size: element.size,
                            mimetype: element.mimetype
                        });
                    });
                    operation.files = dataFiles;
                }
                return [4 /*yield*/, operationBill_1.default.findOneAndUpdate({ _id: id }, operation, { new: true })];
            case 1:
                responseInsert = _b.sent();
                return [4 /*yield*/, updateEgress(id, operation)];
            case 2:
                resultEgress = _b.sent();
                return [2 /*return*/, resultEgress];
        }
    });
}); };
exports.updateOperationBills = updateOperationBills;
var deleteOperationBills = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var responseItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, operationBill_1.default.remove({ _id: id })];
            case 1:
                responseItem = _a.sent();
                return [2 /*return*/, responseItem];
        }
    });
}); };
exports.deleteOperationBills = deleteOperationBills;
