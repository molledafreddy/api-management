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
exports.validOrderProvider = exports.insertOrUpdateOrder = exports.searchOrderDetail = exports.getOrderDetail = exports.searchOrderPaitOut = exports.getOrder = exports.getOrders = void 0;
var order_1 = __importDefault(require("../models/order"));
var logisticOrder_1 = __importDefault(require("../models/logisticOrder"));
var paymentTypeHasEgress_1 = __importDefault(require("../models/paymentTypeHasEgress"));
var provider_1 = require("./provider");
var paymentType_1 = require("./paymentType");
var workingDay_1 = require("./workingDay");
var egress_1 = __importDefault(require("../models/egress"));
var mongoose_1 = __importDefault(require("mongoose"));
var ObjectId = mongoose_1.default.Types.ObjectId;
var getOrders = function () { return __awaiter(void 0, void 0, void 0, function () {
    var responseItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, order_1.default.find({})];
            case 1:
                responseItem = _a.sent();
                console.log('responseItem', responseItem);
                return [2 /*return*/, responseItem];
        }
    });
}); };
exports.getOrders = getOrders;
var getOrder = function (_id) { return __awaiter(void 0, void 0, void 0, function () {
    var valid, response, ObjectId_1, responseItem, error_1;
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
                ObjectId_1 = mongoose_1.default.Types.ObjectId;
                valid = { _id: new ObjectId_1(_id) };
                return [4 /*yield*/, order_1.default.aggregate([
                        { $match: valid },
                        { $lookup: { from: 'egresses', localField: '_id', foreignField: 'orders', as: 'egress' } },
                        { $lookup: { from: 'logisticorders', localField: '_id', foreignField: 'orders', as: 'logisticOrder' } },
                        { $lookup: { from: "providers", localField: "providers", foreignField: "_id", as: "providers" }, },
                    ])];
            case 2:
                responseItem = _a.sent();
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
exports.getOrder = getOrder;
var searchOrderDetail = function (order) { return __awaiter(void 0, void 0, void 0, function () {
    var ObjectId, filter, _id, providers, paymentMethod, status, page, limit, response, myArray, myArray2, myArray, myArray2, myArray, myArray2, myArray, myArray2, myArray, myArray2, responseItem, e_1;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
    return __generator(this, function (_6) {
        switch (_6.label) {
            case 0:
                ObjectId = mongoose_1.default.Types.ObjectId;
                // return  order;
                console.log('date', order);
                filter = {};
                _id = order._idOrder || null;
                providers = order.providers || '';
                paymentMethod = order.paymentMethod || '';
                status = order.status || '';
                page = parseInt(order.page, 10) || 1;
                limit = parseInt(order.limit, 10) || 10;
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
                if (_id !== null) {
                    filter._id = new ObjectId(_id);
                }
                // return filter;
                // 
                if (order.status !== '') {
                    filter.status = status;
                }
                if (order.providers !== '') {
                    filter.providers = new ObjectId(providers);
                }
                if (order.paymentMethod !== '') {
                    filter.paymentMethod = paymentMethod;
                }
                // console.log('Object.entries(order.date[0].estimateReceptionDate).length', order.date[0].estimateReceptionDate.firstDate)
                // return filter;
                if ((((_a = order.date.estimateReceptionDate) === null || _a === void 0 ? void 0 : _a.firstDate) !== null && ((_b = order.date.estimateReceptionDate) === null || _b === void 0 ? void 0 : _b.firstDate) !== undefined)
                    && (((_c = order.date.estimateReceptionDate) === null || _c === void 0 ? void 0 : _c.endDate) !== null && ((_d = order.date.estimateReceptionDate) === null || _d === void 0 ? void 0 : _d.endDate) !== undefined)) {
                    myArray = (_e = order === null || order === void 0 ? void 0 : order.date.estimateReceptionDate) === null || _e === void 0 ? void 0 : _e.firstDate.split("/");
                    myArray2 = (_f = order === null || order === void 0 ? void 0 : order.date.estimateReceptionDate) === null || _f === void 0 ? void 0 : _f.endDate.split("/");
                    // console.log('lleog myArraysss', myArray)
                    // console.log('lleog myArray2', myArray2)
                    filter.EstimateReceptionDate = {
                        $gte: new Date(myArray[2], myArray[0] - 1, myArray[1], 0, 0, 0, 0),
                        $lt: new Date(myArray2[2], myArray2[0] - 1, myArray2[1], 23, 59, 59, 999)
                    };
                }
                if ((((_g = order.date.creditPaymentDate) === null || _g === void 0 ? void 0 : _g.firstDate) !== null && ((_h = order.date.creditPaymentDate) === null || _h === void 0 ? void 0 : _h.firstDate) !== undefined)
                    && (((_j = order.date.creditPaymentDate) === null || _j === void 0 ? void 0 : _j.endDate) !== null && ((_k = order.date.creditPaymentDate) === null || _k === void 0 ? void 0 : _k.endDate) !== undefined)) {
                    myArray = (_l = order === null || order === void 0 ? void 0 : order.date.creditPaymentDate) === null || _l === void 0 ? void 0 : _l.firstDate.split("/");
                    myArray2 = (_m = order === null || order === void 0 ? void 0 : order.date.creditPaymentDate) === null || _m === void 0 ? void 0 : _m.endDate.split("/");
                    filter.creditPaymentDate = {
                        $gte: new Date(myArray[0], myArray[1] - 1, myArray[2], 0, 0, 0),
                        $lt: new Date(myArray2[0], myArray2[1] - 1, myArray2[2], 23, 59, 999)
                    };
                }
                if (((((_o = order.date.paymentDate) === null || _o === void 0 ? void 0 : _o.firstDate) !== null && ((_p = order.date.paymentDate) === null || _p === void 0 ? void 0 : _p.firstDate) !== undefined))
                    && (((_q = order.date.paymentDate) === null || _q === void 0 ? void 0 : _q.endDate) !== null && ((_r = order.date.paymentDate) === null || _r === void 0 ? void 0 : _r.endDate) !== undefined)) {
                    myArray = (_s = order === null || order === void 0 ? void 0 : order.date.paymentDate) === null || _s === void 0 ? void 0 : _s.firstDate.split("/");
                    myArray2 = (_t = order === null || order === void 0 ? void 0 : order.date.paymentDate) === null || _t === void 0 ? void 0 : _t.endDate.split("/");
                    filter.paymentDate = {
                        $gte: new Date(myArray[2], myArray[0] - 1, myArray[1], 0, 0, 0, 0),
                        $lt: new Date(myArray2[2], myArray2[0] - 1, myArray2[1], 23, 59, 59, 999)
                    };
                }
                if ((((_u = order.date.receptionDate) === null || _u === void 0 ? void 0 : _u.firstDate) !== null && ((_v = order.date.receptionDate) === null || _v === void 0 ? void 0 : _v.firstDate) !== undefined)
                    && (((_w = order.date.receptionDate) === null || _w === void 0 ? void 0 : _w.endDate) !== null && ((_x = order.date.receptionDate) === null || _x === void 0 ? void 0 : _x.endDate) !== undefined)) {
                    myArray = (_y = order === null || order === void 0 ? void 0 : order.date.receptionDate) === null || _y === void 0 ? void 0 : _y.firstDate.split("/");
                    myArray2 = (_z = order === null || order === void 0 ? void 0 : order.date.receptionDate) === null || _z === void 0 ? void 0 : _z.endDate.split("/");
                    filter.receptionDate = {
                        $gte: new Date(myArray[2], myArray[0] - 1, myArray[1], 0, 0, 0, 0),
                        $lt: new Date(myArray2[2], myArray2[0] - 1, myArray2[1], 23, 59, 59, 999)
                    };
                }
                // return filter
                // console.log('order.date', order.date)    
                if ((((_0 = order.date.orderDate) === null || _0 === void 0 ? void 0 : _0.firstDate) !== null && ((_1 = order.date.orderDate) === null || _1 === void 0 ? void 0 : _1.firstDate) !== undefined)
                    && (((_2 = order.date.orderDate) === null || _2 === void 0 ? void 0 : _2.endDate) !== null && ((_3 = order.date.orderDate) === null || _3 === void 0 ? void 0 : _3.endDate) !== undefined)) {
                    myArray = (_4 = order === null || order === void 0 ? void 0 : order.date.orderDate) === null || _4 === void 0 ? void 0 : _4.firstDate.split("/");
                    myArray2 = (_5 = order === null || order === void 0 ? void 0 : order.date.orderDate) === null || _5 === void 0 ? void 0 : _5.endDate.split("/");
                    filter.orderDate = {
                        $gte: new Date(myArray[2], myArray[0] - 1, myArray[1], 0, 0, 0, 0),
                        $lt: new Date(myArray2[2], myArray2[0] - 1, myArray2[1], 23, 59, 59, 999)
                    };
                }
                _6.label = 1;
            case 1:
                _6.trys.push([1, 3, , 4]);
                return [4 /*yield*/, order_1.default.aggregate([
                        { $match: filter },
                        { $lookup: { from: 'egresses', localField: '_id', foreignField: 'orders', as: 'egress' } },
                        { $lookup: { from: 'logisticorders', localField: '_id', foreignField: 'orders', as: 'logisticOrder' } },
                        { $lookup: { from: "providers", localField: "providers", foreignField: "_id", as: "providers" }, },
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
            case 2:
                responseItem = _6.sent();
                if (Object.entries(responseItem).length > 0) {
                    response.docs = responseItem;
                    response.totalDocs = responseItem[0].totalDocs;
                    response.limit = limit;
                    response.totalPages = Math.ceil(responseItem[0].totalDocs / limit);
                    response.page = (page - 1) * limit || 0;
                    response.prevPage = page;
                    response.nextPage = (page + 1);
                }
                return [2 /*return*/, response];
            case 3:
                e_1 = _6.sent();
                console.log(e_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.searchOrderDetail = searchOrderDetail;
var searchOrderPaitOut = function (order) { return __awaiter(void 0, void 0, void 0, function () {
    var ObjectId, filter, _id, status, page, limit, response, myArray, myArray2, now, formatoMap, responseSum, responseItem, e_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ObjectId = mongoose_1.default.Types.ObjectId;
                filter = {};
                _id = order._idOrder || null;
                status = order.status || '';
                page = parseInt(order.page, 10) || 1;
                limit = parseInt(order.limit, 10) || 10;
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
                    nextPage: 0,
                    sum: 0
                };
                if (order.status !== '') {
                    filter.status = status;
                }
                if (((order.startDate !== 'null' && order.startDate !== ''))
                    && (order.endDate !== 'null' && order.endDate !== '')) {
                    console.log('imgreso a la validacion fecha', order.startDate);
                    myArray = order === null || order === void 0 ? void 0 : order.startDate.split("/");
                    myArray2 = order === null || order === void 0 ? void 0 : order.endDate.split("/");
                    filter.paymentDate = {
                        $gte: new Date(myArray[2], myArray[0] - 1, myArray[1], 0, 0, 0, 0),
                        $lt: new Date(myArray2[2], myArray2[0] - 1, myArray2[1], 23, 59, 59, 999)
                    };
                }
                else {
                    now = new Date();
                    formatoMap = {
                        dd: now.getDate(),
                        mm: now.getMonth(),
                        yyyy: now.getFullYear()
                    };
                    filter.paymentDate = {
                        $gte: new Date(formatoMap.yyyy, formatoMap.mm, formatoMap.dd, 0, 0, 0, 0),
                        $lt: new Date(formatoMap.yyyy, formatoMap.mm, formatoMap.dd, 23, 59, 59, 999)
                    };
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                responseSum = [];
                return [4 /*yield*/, order_1.default.aggregate([
                        { $match: filter },
                        { $group: { _id: null, sum: { $sum: "$amountPaid" } } }
                    ])];
            case 2:
                responseSum = _b.sent();
                return [4 /*yield*/, order_1.default.aggregate([
                        { $match: filter },
                        { $lookup: { from: 'egresses', localField: '_id', foreignField: 'orders', as: 'egress' } },
                        { $lookup: { from: "providers", localField: "providers", foreignField: "_id", as: "providers" }, },
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
            case 3:
                responseItem = _b.sent();
                if (Object.entries(responseItem).length > 0) {
                    response.docs = responseItem;
                    response.sum = (_a = responseSum[0]) === null || _a === void 0 ? void 0 : _a.sum;
                    response.limit = limit;
                    response.totalPages = Math.ceil(responseItem[0].totalDocs / limit);
                    response.page = (page - 1) * limit || 0;
                    response.prevPage = page;
                    response.nextPage = (page + 1);
                }
                return [2 /*return*/, response];
            case 4:
                e_2 = _b.sent();
                console.log(e_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.searchOrderPaitOut = searchOrderPaitOut;
var getOrderDetail = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var filtro, now, formatoMap, dateStr, nextDate, responseItem, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                filtro = {};
                now = new Date();
                formatoMap = {
                    dd: now.getDate(),
                    mm: now.getMonth() + 1,
                    yy: now.getFullYear().toString().slice(-2),
                    yyyy: now.getFullYear()
                };
                dateStr = new Date(formatoMap.yyyy, formatoMap.mm, formatoMap.dd, 0, 0, 0);
                nextDate = new Date(formatoMap.yyyy, formatoMap.mm, formatoMap.dd, 23, 59, 59);
                filtro = {
                    _id: new mongoose_1.default.Types.ObjectId('6372308ba15b0459089cf6e0'),
                    providers: new mongoose_1.default.Types.ObjectId('6358403b25b29d9b3d42846c'),
                    status: 'paid_out',
                    // EstimateReceptionDate:{
                    //     $gte: dateStr,
                    //     $lt: nextDate
                    // }
                };
                // filtro = { 
                //     providers: new mongoose.Types.ObjectId('6358403b25b29d9b3d42846c') 
                // };
                // filtro.providers = new mongoose.Types.ObjectId('6372308ba15b0459089cf6e0')
                console.log('datos del filtro datos del filtrodatos del filtro', filtro);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, order_1.default.aggregate([
                        {
                            $match: filtro
                        },
                        {
                            $lookup: {
                                from: 'egresses',
                                localField: '_id',
                                foreignField: 'orders',
                                as: 'egress'
                            }
                        },
                        {
                            $lookup: {
                                from: "providers",
                                localField: "providers",
                                foreignField: "_id",
                                as: "providers"
                            },
                        }
                    ])];
            case 2:
                responseItem = _a.sent();
                return [2 /*return*/, responseItem];
            case 3:
                e_3 = _a.sent();
                console.log(e_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getOrderDetail = getOrderDetail;
var validPaidOrder = function (order) {
    if (order.status === "paid_out" && order.amountPaid <= 0) {
        return "NOT_FOUND_AMOUNT";
    }
    // return "paso la validacion";
    if (order.egress == undefined || Object.entries(order.egress).length == 0) {
        return "NOT_FOUND_DATA_EGRESS";
    }
    // console.log('order.egress.paymentHasEgress')
    if (order.egress.paymentHasEgress == undefined || Object.entries(order.egress.paymentHasEgress).length == 0) {
        return "NOT_FOUND_DATA_PAYMENT_HAS_EGRESS";
    }
    var valueAmount = 0;
    valueAmount = order.egress.paymentHasEgress.filter(function (d) { return parseInt(d.paymentAmount); }).map(function (d) { return parseInt(d.paymentAmount); }).reduce(function (a, b) { return a + b; }, 0);
    // const data = order?.amount?.split("$")  
    // const dataFormat = new Intl.NumberFormat('es-CL').format(valueAmount)
    //   console.log('order', order)
    console.log('order.amount', order.amountPaid);
    console.log('dataFormat', valueAmount);
    if (valueAmount != order.amountPaid) {
        return "AMOUNT_DISTINC_SUM_PAYMENT_EGRESS";
    }
    return "VALID_SUCCESS";
};
var insertOrUpdateOrder = function (order) { return __awaiter(void 0, void 0, void 0, function () {
    var resultProvider, value, resulData, resultDate, dataFiles, resultUpdate, resultData;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                resultProvider = [];
                return [4 /*yield*/, (0, provider_1.getProvider)(order.providers)];
            case 1:
                resultProvider = _b.sent();
                // return resultProvider;
                if (Object.keys(resultProvider).length == 0) {
                    return [2 /*return*/, "PROVEEDOR_NOT_FOUND"];
                }
                // return [order];
                if (order.status != "paid_out"
                    && order.estimatedAmount <= 0) {
                    return [2 /*return*/, "NOT_FOUND_ESTIMATED_AMOUNT"];
                }
                // console.log('orderorderorder', order)
                // return [order];
                // return "paso la validacion";
                // if (order.status != "paid_out" 
                //     && order.egress != undefined 
                //     && Object.entries(order?.egress as any).length > 0) {
                //     return "INFORMATION_EGREES_WITH_DATA";
                // }
                if (order.status === "paid_out") {
                    value = validPaidOrder(order);
                    if (value != "VALID_SUCCESS") {
                        return [2 /*return*/, value];
                    }
                }
                resulData = [];
                return [4 /*yield*/, (0, workingDay_1.getWorkingForDate)()];
            case 2:
                resultDate = _b.sent();
                if (!(Object.keys(resultDate).length == 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, workingDay_1.insertWorkingDay)()];
            case 3:
                resulData = _b.sent();
                return [3 /*break*/, 5];
            case 4:
                resulData = resultDate[0];
                _b.label = 5;
            case 5:
                dataFiles = [];
                // console.log('archivos', operation.files)
                if (Object.keys(order.files).length > 0) {
                    console.log('ingreso tiene archivos');
                    (_a = order.files) === null || _a === void 0 ? void 0 : _a.forEach(function (element) {
                        // console.log('element',element)
                        dataFiles.push({
                            path: element.path,
                            pathView: "".concat(process.cwd(), "/storage/").concat(element.filename),
                            filename: element.filename,
                            size: element.size,
                            mimetype: element.mimetype
                        });
                    });
                    order.files = dataFiles;
                }
                if (!order._id) return [3 /*break*/, 7];
                return [4 /*yield*/, updateOrder(order._id, resulData._id, order)];
            case 6:
                resultUpdate = _b.sent();
                return [2 /*return*/, resultUpdate];
            case 7: return [4 /*yield*/, insertOrder(resulData._id, order)];
            case 8:
                resultData = _b.sent();
                return [2 /*return*/, resultData];
            case 9: return [2 /*return*/, order];
        }
    });
}); };
exports.insertOrUpdateOrder = insertOrUpdateOrder;
var insertOrder = function (idWorkingDay, data) { return __awaiter(void 0, void 0, void 0, function () {
    var responseInsertOrder, dataLogistic, responseInsert;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, order_1.default.create(data)];
            case 1:
                responseInsertOrder = _a.sent();
                console.log('responseInsertOrder', responseInsertOrder);
                if (!responseInsertOrder._id) return [3 /*break*/, 3];
                dataLogistic = {
                    orders: responseInsertOrder._id,
                    users: data.users,
                    workingDay: idWorkingDay,
                    descriptionLogistic: data === null || data === void 0 ? void 0 : data.descriptionLogistic,
                    status: data === null || data === void 0 ? void 0 : data.status
                };
                return [4 /*yield*/, logisticOrder_1.default.create(dataLogistic)];
            case 2:
                responseInsert = _a.sent();
                console.log('responseInsert Logistinc', responseInsert);
                // if (data.status === 'paid_out') {
                // console.log('ingreso aca createEgress')
                createEgress(responseInsertOrder._id, data);
                _a.label = 3;
            case 3: return [2 /*return*/, responseInsertOrder];
        }
    });
}); };
var createEgress = function (orderId, data) { return __awaiter(void 0, void 0, void 0, function () {
    var validEgress, dataEgress, responseInsertE_1, resultPayments_1, dataPayment_1, responseInsertP;
    var _a, _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0: return [4 /*yield*/, getEgress(orderId)
                // console.log('validEgress', validEgress)
            ];
            case 1:
                validEgress = _f.sent();
                if (!(Object.keys(validEgress).length == 0)) return [3 /*break*/, 7];
                console.log("ingreso se creara un abono");
                console.log("ingreso se creara un abono");
                console.log("ingreso se creara un abono");
                console.log("ingreso se creara un abono");
                dataEgress = {
                    invoiceNumber: (_a = data.egress) === null || _a === void 0 ? void 0 : _a.invoiceNumber,
                    amount: (_b = data.egress) === null || _b === void 0 ? void 0 : _b.amount,
                    orders: orderId,
                    description: data === null || data === void 0 ? void 0 : data.descriptionPayment,
                    files: data === null || data === void 0 ? void 0 : data.files,
                    type: 'orders',
                    paymentDate: data === null || data === void 0 ? void 0 : data.paymentDate,
                };
                return [4 /*yield*/, egress_1.default.create(dataEgress)];
            case 2:
                responseInsertE_1 = _f.sent();
                if (!(Object.keys((_c = data.egress) === null || _c === void 0 ? void 0 : _c.paymentHasEgress).length > 0)) return [3 /*break*/, 6];
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
var getEgress = function (orderId) { return __awaiter(void 0, void 0, void 0, function () {
    var resp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, egress_1.default.find({
                    orders: orderId
                })];
            case 1:
                resp = _a.sent();
                console.log('consulta de egresos', resp);
                return [2 /*return*/, resp];
        }
    });
}); };
var updateOrder = function (id, idWorkingDay, data) { return __awaiter(void 0, void 0, void 0, function () {
    var responseItem, resultGet, dataLogistic, responseInsert, validEgress, resultEgress;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('updateOrder', data);
                return [4 /*yield*/, order_1.default.findOneAndUpdate({ _id: id }, data, { new: true })];
            case 1:
                responseItem = _a.sent();
                console.log('responseItem actualizacion de orden', responseItem);
                return [4 /*yield*/, getOrder(id)];
            case 2:
                resultGet = _a.sent();
                dataLogistic = {
                    orders: data === null || data === void 0 ? void 0 : data._id,
                    users: data.users,
                    workingDay: idWorkingDay,
                    descriptionLogistic: data === null || data === void 0 ? void 0 : data.descriptionLogistic,
                    status: data.status
                };
                return [4 /*yield*/, logisticOrder_1.default.create(dataLogistic)];
            case 3:
                responseInsert = _a.sent();
                return [4 /*yield*/, getEgress(id)];
            case 4:
                validEgress = _a.sent();
                if (!(Object.keys(validEgress).length > 0)) return [3 /*break*/, 6];
                return [4 /*yield*/, updateEgress(id, data)];
            case 5:
                resultEgress = _a.sent();
                return [2 /*return*/, resultEgress];
            case 6:
                // console.log('ingreso else debe crear egreseo')
                createEgress(id, data);
                _a.label = 7;
            case 7: 
            // if (data.status === 'paid_out') {
            // return resultEgress;
            // }
            return [2 /*return*/, responseItem];
        }
    });
}); };
var updateEgress = function (orderId, data) { return __awaiter(void 0, void 0, void 0, function () {
    var validEgress, dataEgress, infoFile_1, responseInsertE, deleteI, resultPayments_2, dataPayment_2, responseInsertP;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return __generator(this, function (_l) {
        switch (_l.label) {
            case 0: return [4 /*yield*/, getEgress(orderId)];
            case 1:
                validEgress = _l.sent();
                console.log('data orden', data);
                console.log('validEgress inreso a la actualizacion del ingreso', orderId, validEgress);
                if (!(Object.keys(validEgress).length > 0)) return [3 /*break*/, 14];
                // console.log("ingreso se creara un abono")
                // console.log("ingreso se creara un abono")
                console.log("ingreso se creara un abono data?.dataFiles", data === null || data === void 0 ? void 0 : data.dataFiles);
                console.log("ingreso se creara un abono data?.files", data === null || data === void 0 ? void 0 : data.files);
                dataEgress = {
                    invoiceNumber: (_a = data.egress) === null || _a === void 0 ? void 0 : _a.invoiceNumber,
                    orders: orderId,
                    description: data === null || data === void 0 ? void 0 : data.descriptionPayment,
                    amount: data === null || data === void 0 ? void 0 : data.amountPaid,
                    type: 'orders',
                    paymentDate: data === null || data === void 0 ? void 0 : data.paymentDate,
                };
                console.log('modelo egreso', dataEgress);
                infoFile_1 = [];
                if (!(Object.keys(data === null || data === void 0 ? void 0 : data.dataFiles).length > 0 && Object.keys(data === null || data === void 0 ? void 0 : data.files).length > 0)) return [3 /*break*/, 4];
                // infoFile.push(data?.files);
                console.log('ingreso tiene datafiles y files');
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
                _l.sent();
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
                _l.sent();
                console.log('infoFiles', infoFile_1);
                // infoFile.push(data?.files as any);
                dataEgress.files = infoFile_1;
                return [3 /*break*/, 7];
            case 4:
                if (!(Object.keys(data === null || data === void 0 ? void 0 : data.files).length > 0)) return [3 /*break*/, 5];
                // infoFile = data?.files as any;
                console.log('ingreso tiene files');
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
                _l.sent();
                dataEgress.files = infoFile_1;
                _l.label = 7;
            case 7:
                console.log("dataEgress", dataEgress);
                return [4 /*yield*/, egress_1.default.findOneAndUpdate({ _id: (_e = data === null || data === void 0 ? void 0 : data.egress) === null || _e === void 0 ? void 0 : _e._id }, dataEgress, { new: true })];
            case 8:
                responseInsertE = _l.sent();
                console.log('resultado egresos', responseInsertE);
                return [4 /*yield*/, paymentTypeHasEgress_1.default.deleteMany({ egress: (_f = data === null || data === void 0 ? void 0 : data.egress) === null || _f === void 0 ? void 0 : _f._id })];
            case 9:
                deleteI = _l.sent();
                console.log('data.egress?.paymentHasEgress', (_g = data.egress) === null || _g === void 0 ? void 0 : _g.paymentHasEgress);
                if (!(Object.keys((_h = data.egress) === null || _h === void 0 ? void 0 : _h.paymentHasEgress).length > 0)) return [3 /*break*/, 13];
                return [4 /*yield*/, (0, paymentType_1.getPaymentTypes)()];
            case 10:
                resultPayments_2 = _l.sent();
                if (!(Object.keys(resultPayments_2).length > 0)) return [3 /*break*/, 13];
                dataPayment_2 = [];
                return [4 /*yield*/, ((_k = (_j = data.egress) === null || _j === void 0 ? void 0 : _j.paymentHasEgress) === null || _k === void 0 ? void 0 : _k.forEach(function (item) {
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
                _l.sent();
                return [4 /*yield*/, paymentTypeHasEgress_1.default.insertMany(dataPayment_2)];
            case 12:
                responseInsertP = _l.sent();
                console.log('responseInsertP', responseInsertP);
                _l.label = 13;
            case 13: return [2 /*return*/, dataEgress];
            case 14:
                console.log(' n consigio egreso');
                console.log(' n consigio egreso');
                console.log(' n consigio egreso');
                console.log(' n consigio egreso');
                _l.label = 15;
            case 15: return [2 /*return*/];
        }
    });
}); };
var validOrderProvider = function (provider) { return __awaiter(void 0, void 0, void 0, function () {
    var responseTurn;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, order_1.default.find({
                    $or: [{ status: { $gt: "requested" } }, { status: { $gt: "no_received" } }],
                    providers: provider
                })];
            case 1:
                responseTurn = _a.sent();
                return [2 /*return*/, responseTurn];
        }
    });
}); };
exports.validOrderProvider = validOrderProvider;
