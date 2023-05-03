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
exports.getRevenueOther = exports.getRevenueTurn = exports.getRevenue = exports.getRevenues = exports.insertOrUpdateRevenueOther = exports.insertOrUpdateRevenueWorkingDay = void 0;
var revenue_1 = __importDefault(require("../models/revenue"));
var turn_1 = require("./turn");
var mongoose_1 = __importDefault(require("mongoose"));
var workingDay_1 = require("./workingDay");
var insertOrUpdateRevenueWorkingDay = function (revenue) { return __awaiter(void 0, void 0, void 0, function () {
    var value, resError, dataF, resultUpdate, validTurnR, resError, resultData;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                value = validPaidRevenue(revenue);
                if (value != "VALID_SUCCESS") {
                    resError = {
                        codeHttp: '400',
                        code: value,
                        message: 'Error, debe verificar los montos enviados.'
                    };
                    return [2 /*return*/, resError];
                }
                dataF = [];
                if (Object.keys(revenue.files).length > 0) {
                    (_a = revenue.files) === null || _a === void 0 ? void 0 : _a.forEach(function (element) {
                        dataF.push({
                            path: element.path,
                            pathView: "".concat(process.cwd(), "/storage/").concat(element.filename),
                            filename: element.filename,
                            size: element.size,
                            mimetype: element.mimetype
                        });
                    });
                    revenue.files = dataF;
                    revenue.revenue.files = dataF;
                }
                if (!revenue.id) return [3 /*break*/, 2];
                return [4 /*yield*/, updateRevenue(revenue.id, revenue)];
            case 1:
                resultUpdate = _b.sent();
                return [2 /*return*/, resultUpdate];
            case 2: return [4 /*yield*/, (0, turn_1.validTurn)(revenue.users, 'Active')];
            case 3:
                validTurnR = _b.sent();
                // console.log('data', validTurnR)
                // return validTurnR;
                if (Object.keys(validTurnR).length <= 0) {
                    resError = {
                        codeHttp: '400',
                        code: "NOT_FOUND_TURN",
                        message: 'Para Ingresar un Cierre de Caja debes tener un turno activo en la jornada de hoy'
                    };
                    return [2 /*return*/, resError];
                }
                console.log('inregos al revenue', revenue);
                revenue.revenue.turn = validTurnR[0]._id;
                revenue.revenue.workingDay = validTurnR[0].workingDay[0];
                return [4 /*yield*/, insertRevenue(revenue)];
            case 4:
                resultData = _b.sent();
                return [2 /*return*/, resultData];
        }
    });
}); };
exports.insertOrUpdateRevenueWorkingDay = insertOrUpdateRevenueWorkingDay;
var insertOrUpdateRevenueOther = function (revenue) { return __awaiter(void 0, void 0, void 0, function () {
    var dataF, resultUpdate, resulData, resultDate, resultData;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                // return revenue
                if ((revenue === null || revenue === void 0 ? void 0 : revenue.revenue.totalAmount) <= 0) {
                    return [2 /*return*/, "NOT_FOUND_TOTALAMOUNT"];
                }
                dataF = [];
                if (Object.keys(revenue.files).length > 0) {
                    (_a = revenue.files) === null || _a === void 0 ? void 0 : _a.forEach(function (element) {
                        dataF.push({
                            path: element.path,
                            pathView: "".concat(process.cwd(), "/storage/").concat(element.filename),
                            filename: element.filename,
                            size: element.size,
                            mimetype: element.mimetype
                        });
                    });
                    revenue.files = dataF;
                    revenue.revenue.files = dataF;
                }
                if (!revenue.id) return [3 /*break*/, 2];
                return [4 /*yield*/, updateRevenue(revenue.id, revenue)];
            case 1:
                resultUpdate = _b.sent();
                return [2 /*return*/, resultUpdate];
            case 2:
                resulData = [];
                return [4 /*yield*/, (0, workingDay_1.getWorkingForDate)()];
            case 3:
                resultDate = _b.sent();
                if (!(Object.keys(resultDate).length == 0)) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, workingDay_1.insertWorkingDay)()];
            case 4:
                resulData = _b.sent();
                return [3 /*break*/, 6];
            case 5:
                resulData = resultDate[0];
                _b.label = 6;
            case 6:
                revenue.revenue.workingDay = resulData._id;
                return [4 /*yield*/, insertRevenue(revenue)];
            case 7:
                resultData = _b.sent();
                return [2 /*return*/, resultData];
        }
    });
}); };
exports.insertOrUpdateRevenueOther = insertOrUpdateRevenueOther;
var insertRevenue = function (revenue) { return __awaiter(void 0, void 0, void 0, function () {
    var responseInsert;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('inregos al insertRevenue');
                return [4 /*yield*/, revenue_1.default.create(revenue.revenue)];
            case 1:
                responseInsert = _a.sent();
                console.log('result revenue insert', responseInsert);
                return [2 /*return*/, responseInsert];
        }
    });
}); };
var updateRevenue = function (revenueId, revenue) { return __awaiter(void 0, void 0, void 0, function () {
    var validRevenue, dataRevenue, infoFile_1, responseInsertR;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, getRevenueValid(revenueId)];
            case 1:
                validRevenue = _d.sent();
                if (!(Object.keys(validRevenue).length > 0)) return [3 /*break*/, 9];
                dataRevenue = {
                    amountTransfer: revenue.revenue.amountTransfer,
                    amountPos: revenue.revenue.amountPos,
                    amountCash: revenue.revenue.amountCash,
                    amountOther: revenue.revenue.amountOther,
                    amountSistem: revenue.revenue.amountSistem,
                    description: revenue.revenue.description,
                    cashFund: revenue.revenue.cashFund,
                    amountTurn: revenue.revenue.totalAmount,
                    totalAmount: revenue.revenue.totalAmount,
                    type: revenue.revenue.type,
                    validAdmin: revenue.validAdmin,
                    noteValid: revenue.noteValid === undefined ? '' : revenue.noteValid,
                    usersAdmin: revenue.usersAdmin,
                    validDate: new Date()
                };
                infoFile_1 = [];
                if (!(Object.keys(revenue === null || revenue === void 0 ? void 0 : revenue.dataFiles).length > 0 && Object.keys(revenue === null || revenue === void 0 ? void 0 : revenue.files).length > 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, ((_a = revenue === null || revenue === void 0 ? void 0 : revenue.dataFiles) === null || _a === void 0 ? void 0 : _a.forEach(function (element) {
                        infoFile_1.push({
                            filename: element.filename,
                            path: element.path,
                            pathView: "".concat(process.cwd(), "/storage/").concat(element.filename),
                            size: element.size,
                            mimetype: element.mimetype
                        });
                    }))];
            case 2:
                _d.sent();
                return [4 /*yield*/, ((_b = revenue === null || revenue === void 0 ? void 0 : revenue.files) === null || _b === void 0 ? void 0 : _b.forEach(function (element) {
                        infoFile_1.push({
                            filename: element.filename,
                            path: element.path,
                            pathView: "".concat(process.cwd(), "/storage/").concat(element.filename),
                            size: element.size,
                            mimetype: element.mimetype
                        });
                    }))];
            case 3:
                _d.sent();
                dataRevenue.files = infoFile_1;
                return [3 /*break*/, 7];
            case 4:
                if (!(Object.keys(revenue === null || revenue === void 0 ? void 0 : revenue.files).length > 0)) return [3 /*break*/, 5];
                dataRevenue.files = revenue.files;
                return [3 /*break*/, 7];
            case 5:
                if (!(Object.keys(revenue === null || revenue === void 0 ? void 0 : revenue.dataFiles).length > 0)) return [3 /*break*/, 7];
                return [4 /*yield*/, ((_c = revenue === null || revenue === void 0 ? void 0 : revenue.dataFiles) === null || _c === void 0 ? void 0 : _c.forEach(function (element) {
                        infoFile_1.push({
                            filename: element.filename,
                            path: element.path,
                            pathView: "".concat(process.cwd(), "/storage/").concat(element.filename),
                            size: element.size,
                            mimetype: element.mimetype
                        });
                    }))];
            case 6:
                _d.sent();
                dataRevenue.files = infoFile_1;
                _d.label = 7;
            case 7: return [4 /*yield*/, revenue_1.default.findOneAndUpdate({ _id: revenueId }, dataRevenue, { new: true })];
            case 8:
                responseInsertR = _d.sent();
                return [2 /*return*/, responseInsertR];
            case 9: return [2 /*return*/];
        }
    });
}); };
var validRevenueOther = function (users) { return __awaiter(void 0, void 0, void 0, function () {
    var now, responseTurn;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                now = new Date();
                return [4 /*yield*/, revenue_1.default.find({
                        users: users
                    })];
            case 1:
                responseTurn = _a.sent();
                return [2 /*return*/, responseTurn];
        }
    });
}); };
var validRevenueWorkingDay = function (turn) { return __awaiter(void 0, void 0, void 0, function () {
    var now, formatoMap, dateStr, nextDate, responseTurn;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                now = new Date();
                formatoMap = { dd: now.getDate(), mm: now.getMonth() + 1, yyyy: now.getFullYear() };
                dateStr = new Date(formatoMap.yyyy, formatoMap.mm - 1, formatoMap.dd, 0, 0, 0, 0);
                nextDate = new Date(formatoMap.yyyy, formatoMap.mm - 1, formatoMap.dd, 23, 59, 59, 999);
                return [4 /*yield*/, revenue_1.default.find({
                        createdAt: { $gte: dateStr, $lt: nextDate },
                        turns: turn
                    })];
            case 1:
                responseTurn = _a.sent();
                return [2 /*return*/, responseTurn];
        }
    });
}); };
var validPaidRevenue = function (revenue) {
    var _a, _b, _c, _d;
    if ((revenue === null || revenue === void 0 ? void 0 : revenue.revenue.totalAmount) <= 0) {
        return "NOT_FOUND_TOTALAMOUNT";
    }
    if ((revenue === null || revenue === void 0 ? void 0 : revenue.revenue.amountSistem) <= 0) {
        return "NOT_FOUND_AMOUNTSISTEM";
    }
    // if (revenue?.revenue.amountTurn as number  <=0 ) {
    //     return "NOT_FOUND_AMOUNTURN";
    // }
    if (revenue.revenue == undefined || Object.entries(revenue.revenue).length == 0) {
        return "NOT_FOUND_DATA_REVENUE";
    }
    var result = (Number((_a = revenue === null || revenue === void 0 ? void 0 : revenue.revenue) === null || _a === void 0 ? void 0 : _a.amountCash)
        + Number((_b = revenue === null || revenue === void 0 ? void 0 : revenue.revenue) === null || _b === void 0 ? void 0 : _b.amountOther)
        + Number((_c = revenue === null || revenue === void 0 ? void 0 : revenue.revenue) === null || _c === void 0 ? void 0 : _c.amountPos)
        + Number((_d = revenue === null || revenue === void 0 ? void 0 : revenue.revenue) === null || _d === void 0 ? void 0 : _d.amountTransfer));
    console.log('result', result);
    if (result !== revenue.revenue.totalAmount) {
        return "AMOUNTTURN_DISTINC_SUM_DETAIL_REVENUE";
    }
    // if (revenue.detailRevenue == undefined || Object.entries(revenue.detailRevenue).length == 0) {
    //     return "NOT_FOUND_DATA_DETAIL_REVENUE";
    // }
    // let valueAmount: number = 0;
    // valueAmount = revenue.detailRevenue.filter(d => parseInt(d.amount) ).map(d => d.amount).reduce((a, b) => a  + b, 0);
    // console.log('valueAmount', valueAmount)
    // console.log('revenue.revenue.amountTurn', revenue.revenue.amountTurn)
    // if (valueAmount != revenue.revenue.amountTurn ) {
    //     return "AMOUNTTURN_DISTINC_SUM_DETAIL_REVENUE";
    // }
    return "VALID_SUCCESS";
};
var createDetailRevenue = function (revenueId, data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
var getDetailRevenue = function (revenueId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
var getRevenueValid = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var resp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, revenue_1.default.find({
                    id: id
                })];
            case 1:
                resp = _a.sent();
                return [2 /*return*/, resp];
        }
    });
}); };
var getRevenues = function () { return __awaiter(void 0, void 0, void 0, function () {
    var responseItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, revenue_1.default.find({})];
            case 1:
                responseItem = _a.sent();
                return [2 /*return*/, responseItem];
        }
    });
}); };
exports.getRevenues = getRevenues;
var getRevenue = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var valid, response, ObjectI, responseItem, error_1;
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
                ObjectI = mongoose_1.default.Types.ObjectId;
                // 63ec10592073ceeccba8bf9e
                valid = { _id: new ObjectI(id) };
                // valid = {type: 'cleaning_products'};
                console.log('llego por aca', valid);
                return [4 /*yield*/, revenue_1.default.aggregate([
                        { $match: valid },
                        { $lookup: { from: 'users', localField: 'users', foreignField: '_id', as: 'users' } },
                        { $lookup: { from: 'workingdays', localField: 'workingDay', foreignField: '_id', as: 'workingDay' } },
                        { $lookup: { from: 'detailrevenues', localField: '_id', foreignField: 'revenues', as: 'detailRevenue' } },
                        { $sort: { 'createdAt': -1 } },
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
exports.getRevenue = getRevenue;
var getRevenueTurn = function (revenue) { return __awaiter(void 0, void 0, void 0, function () {
    var filter, Objectid, turn, users, role, page, limit, type, startDate, endDate, response, dataStartDate, dataEndDate, dateStr, nextDate, now, formatoMap, dateStr, nextDate, responseItem, e_1;
    var _a, _b, _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                filter = {};
                Objectid = mongoose_1.default.Types.ObjectId;
                turn = revenue.turn || '';
                users = revenue.users || '';
                role = revenue.role || '';
                page = parseInt(revenue.page, 10) || 1;
                limit = parseInt(revenue.limit, 10) || 10;
                type = revenue.type || '';
                startDate = revenue.startDate || null;
                endDate = revenue.endDate || null;
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
                // if (_id !== null) {
                //     filter._id = new ObjectId(_id) ;
                // }
                if (turn !== "") {
                    // console.log('ingreso turn')
                    filter.turn = new Objectid(turn);
                }
                console.log('users', role);
                if (type !== "") {
                    console.log('ingreso type');
                    filter.type = type;
                }
                console.log('filter get-revenue-turn', filter);
                if (users !== "" && role !== 'Admin') {
                    console.log('ingreso es users');
                    // filter.users = new ObjectId(users) ;
                    filter.users = new Objectid(users);
                }
                else {
                    console.log('es admin');
                }
                // console.log('turn', users)
                // return workingDay;
                // if (workingDay !== null) {
                //     filter.workingDay = new ObjectId(workingDay) ;
                // }
                // return revenue;
                // console.log('startDate dddd', startDate)
                // console.log('endDate gg', endDate)
                // startDate !== undefined &&
                // endDate !== undefined && 
                if (((revenue === null || revenue === void 0 ? void 0 : revenue.startDate) !== 'null') && ((revenue === null || revenue === void 0 ? void 0 : revenue.endDate) !== 'null')) {
                    dataStartDate = startDate.split("/");
                    dataEndDate = endDate.split("/");
                    dateStr = new Date(dataStartDate[2], dataStartDate[0] - 1, dataStartDate[1], 0, 0, 0, 0);
                    nextDate = new Date(dataEndDate[2], dataEndDate[0] - 1, dataEndDate[1], 23, 59, 59, 999);
                    filter.createdAt = {
                        $gte: dateStr, $lt: nextDate
                    };
                }
                else {
                    now = new Date();
                    formatoMap = {
                        dd: now.getDate(),
                        mm: now.getMonth(),
                        yyyy: now.getFullYear()
                    };
                    dateStr = new Date(formatoMap.yyyy, formatoMap.mm, formatoMap.dd, 0, 0, 0, 0);
                    nextDate = new Date(formatoMap.yyyy, formatoMap.mm, formatoMap.dd, 23, 59, 59, 999);
                    filter.createdAt = {
                        $gte: dateStr, $lt: nextDate
                    };
                }
                console.log('datos filter', filter);
                _g.label = 1;
            case 1:
                _g.trys.push([1, 3, , 4]);
                return [4 /*yield*/, revenue_1.default.aggregate([
                        { $match: filter },
                        { $lookup: { from: 'users', localField: 'users', foreignField: '_id', as: 'users' } },
                        { $lookup: { from: 'workingdays', localField: 'workingDay', foreignField: '_id', as: 'workingDay' } },
                        {
                            $setWindowFields: {
                                output: {
                                    totalDocs: { $count: {} },
                                },
                            },
                        },
                        { $sort: { 'createdAt': -1 } },
                        { $skip: (page - 1) * limit || 0 },
                        { $limit: Number(limit) },
                        {
                            $group: { _id: null, sum: { $sum: "$totalAmount" },
                                "datos": {
                                    "$push": {
                                        "_id": "$_id",
                                        "amountCash": "$amountCash",
                                        "amountOther": "$amountOther",
                                        "amountPos": "$amountPos",
                                        "amountSistem": "$amountSistem",
                                        "amountTransfer": "$amountTransfer",
                                        "cashFund": "$cashFund",
                                        "createdAt": "$createdAt",
                                        "description": "$description",
                                        "detailRevenue": "$detailRevenue",
                                        "files": "$files",
                                        "totalAmount": "$totalAmount",
                                        "totalDocs": "$totalDocs",
                                        "turn": "$turn",
                                        "updatedAt": "$updatedAt",
                                        "users": "$users",
                                        "workingDay": "$workingDay",
                                        "type": "$type",
                                        "validAdmin": "$validAdmin",
                                        "noteValid": "$noteValid",
                                        "validDate": "$validDate",
                                        "usersAdmin": "$usersAdmin",
                                    }
                                }
                            }
                        }
                    ])];
            case 2:
                responseItem = _g.sent();
                if (Object.entries(responseItem).length > 0) {
                    response.docs = (_a = responseItem[0]) === null || _a === void 0 ? void 0 : _a.datos;
                    response.totalDocs = (_c = (_b = responseItem[0]) === null || _b === void 0 ? void 0 : _b.datos[0]) === null || _c === void 0 ? void 0 : _c.totalDocs;
                    response.limit = limit;
                    response.sum = (_d = responseItem[0]) === null || _d === void 0 ? void 0 : _d.sum;
                    response.totalPages = Math.ceil(((_f = (_e = responseItem[0]) === null || _e === void 0 ? void 0 : _e.datos[0]) === null || _f === void 0 ? void 0 : _f.totalDocs) / limit);
                    response.page = (page - 1) * limit || 0;
                    response.prevPage = page;
                    response.nextPage = (page + 1);
                }
                return [2 /*return*/, response];
            case 3:
                e_1 = _g.sent();
                console.log(e_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getRevenueTurn = getRevenueTurn;
var getRevenueOther = function (revenue) { return __awaiter(void 0, void 0, void 0, function () {
    var filter, Objectid, turn, users, page, limit, startDate, endDate, response, dataStartDate, dataEndDate, dateStr, nextDate, now, formatoMap, dateStr, nextDate, responseItem, e_2;
    var _a, _b, _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                filter = {};
                Objectid = mongoose_1.default.Types.ObjectId;
                turn = revenue.turn || '';
                users = revenue.users || '';
                page = parseInt(revenue.page, 10) || 1;
                limit = parseInt(revenue.limit, 10) || 10;
                startDate = revenue.startDate || null;
                endDate = revenue.endDate || null;
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
                // if (_id !== null) {
                //     filter._id = new ObjectId(_id) ;
                // }
                if (turn !== "") {
                    // console.log('ingreso turn')
                    filter.turn = new Objectid(turn);
                }
                // if (users !== "") {
                //     console.log('ingreso turn')
                //     filter.users = new ObjectId(users) ;
                // }
                // console.log('turn', users)
                // return workingDay;
                // if (workingDay !== null) {
                //     filter.workingDay = new ObjectId(workingDay) ;
                // }
                // return revenue;
                // console.log('startDate dddd', startDate)
                // console.log('endDate gg', endDate)
                // startDate !== undefined &&
                // endDate !== undefined && 
                if (((revenue === null || revenue === void 0 ? void 0 : revenue.startDate) !== 'null') && ((revenue === null || revenue === void 0 ? void 0 : revenue.endDate) !== 'null')) {
                    dataStartDate = startDate.split("/");
                    dataEndDate = endDate.split("/");
                    dateStr = new Date(dataStartDate[2], dataStartDate[0] - 1, dataStartDate[1], 0, 0, 0, 0);
                    nextDate = new Date(dataEndDate[2], dataEndDate[0] - 1, dataEndDate[1], 23, 59, 59, 999);
                    filter.createdAt = {
                        $gte: dateStr, $lt: nextDate
                    };
                }
                else {
                    now = new Date();
                    formatoMap = {
                        dd: now.getDate(),
                        mm: now.getMonth(),
                        yyyy: now.getFullYear()
                    };
                    dateStr = new Date(formatoMap.yyyy, formatoMap.mm, formatoMap.dd, 0, 0, 0, 0);
                    nextDate = new Date(formatoMap.yyyy, formatoMap.mm, formatoMap.dd, 23, 59, 59, 999);
                    filter.createdAt = {
                        $gte: dateStr, $lt: nextDate
                    };
                }
                _g.label = 1;
            case 1:
                _g.trys.push([1, 3, , 4]);
                return [4 /*yield*/, revenue_1.default.aggregate([
                        { $match: filter },
                        { $lookup: { from: 'users', localField: 'users', foreignField: '_id', as: 'users' } },
                        { $lookup: { from: 'workingdays', localField: 'workingDay', foreignField: '_id', as: 'workingDay' } },
                        // { $lookup: { from:'detailrevenues', localField: '_id', foreignField: 'revenues', as:'detailRevenue'}},
                        {
                            $setWindowFields: {
                                output: {
                                    totalDocs: { $count: {} },
                                },
                            },
                        },
                        { $sort: { 'createdAt': -1 } },
                        { $skip: (page - 1) * limit || 0 },
                        { $limit: Number(limit) },
                        {
                            $group: { _id: null, sum: { $sum: "$totalAmount" },
                                "datos": {
                                    "$push": {
                                        "_id": "$_id",
                                        "amountCash": "$amountCash",
                                        "amountOther": "$amountOther",
                                        "amountPos": "$amountPos",
                                        "amountSistem": "$amountSistem",
                                        "amountTransfer": "$amountTransfer",
                                        "cashFund": "$cashFund",
                                        "createdAt": "$createdAt",
                                        "description": "$description",
                                        "detailRevenue": "$detailRevenue",
                                        "files": "$files",
                                        "totalAmount": "$totalAmount",
                                        "totalDocs": "$totalDocs",
                                        "turn": "$turn",
                                        "updatedAt": "$updatedAt",
                                        "users": "$users",
                                        "workingDay": "$workingDay",
                                    }
                                }
                            }
                        }
                    ])];
            case 2:
                responseItem = _g.sent();
                if (Object.entries(responseItem).length > 0) {
                    response.docs = (_a = responseItem[0]) === null || _a === void 0 ? void 0 : _a.datos;
                    response.totalDocs = (_c = (_b = responseItem[0]) === null || _b === void 0 ? void 0 : _b.datos[0]) === null || _c === void 0 ? void 0 : _c.totalDocs;
                    response.limit = limit;
                    response.sum = (_d = responseItem[0]) === null || _d === void 0 ? void 0 : _d.sum;
                    response.totalPages = Math.ceil(((_f = (_e = responseItem[0]) === null || _e === void 0 ? void 0 : _e.datos[0]) === null || _f === void 0 ? void 0 : _f.totalDocs) / limit);
                    response.page = (page - 1) * limit || 0;
                    response.prevPage = page;
                    response.nextPage = (page + 1);
                }
                return [2 /*return*/, response];
            case 3:
                e_2 = _g.sent();
                console.log(e_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getRevenueOther = getRevenueOther;
