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
exports.validTurn = exports.deleteCar = exports.updateCar = exports.getCar = exports.getCars = exports.getTurn = exports.searchTurnForUser = exports.insertTurn = void 0;
var turn_1 = __importDefault(require("../models/turn"));
var workingDay_1 = require("./workingDay");
var mongoose_1 = __importDefault(require("mongoose"));
// import {  } from "/workingDay";}
var ObjectId = mongoose_1.default.Types.ObjectId;
var insertTurn = function (turn) { return __awaiter(void 0, void 0, void 0, function () {
    var resulData, status, convertFechaStart, resultStart, dataHoraStart, horaStart, HStar, MNStar, SStar, dataFechaStart, fechaStart, YStart, MStart, DStart, dateStr, convertFechaEnd, resultEnd, dataHoraEnd, horaEnd, HEnd, MNEnd, SEnd, dataFechaEnd, fechaEnd, YEnd, MEnd, DEnd, dateEnd, resultDate, dataTurn, responseUpdate, validTurnR, dataTurn, responseInsert;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                resulData = [];
                status = turn.status || '';
                convertFechaStart = turn.startDate.toString();
                resultStart = convertFechaStart.split(" ");
                dataHoraStart = resultStart[1];
                horaStart = dataHoraStart.split(":");
                HStar = Number(horaStart[0]);
                MNStar = Number(horaStart[1]);
                SStar = Number(horaStart[2]);
                dataFechaStart = resultStart[0];
                fechaStart = dataFechaStart.split("/");
                YStart = Number(fechaStart[2]);
                MStart = Number(fechaStart[0]);
                DStart = Number(fechaStart[1]);
                dateStr = new Date(YStart, MStart - 1, DStart, HStar - 3, MNStar, SStar, 0);
                convertFechaEnd = (_a = turn === null || turn === void 0 ? void 0 : turn.endDate) === null || _a === void 0 ? void 0 : _a.toString();
                resultEnd = convertFechaEnd === null || convertFechaEnd === void 0 ? void 0 : convertFechaEnd.split(" ");
                dataHoraEnd = resultEnd[1];
                horaEnd = dataHoraEnd.split(":");
                HEnd = Number(horaEnd[0]);
                MNEnd = Number(horaEnd[1]);
                SEnd = Number(horaEnd[2]);
                dataFechaEnd = resultEnd[0];
                fechaEnd = dataFechaEnd.split("/");
                YEnd = Number(fechaEnd[2]);
                MEnd = Number(fechaEnd[0]);
                DEnd = Number(fechaEnd[1]);
                dateEnd = new Date(YEnd, MEnd - 1, DEnd, HEnd - 3, MNEnd, SEnd, 0);
                return [4 /*yield*/, (0, workingDay_1.getWorkingForDate)()];
            case 1:
                resultDate = _b.sent();
                if (!(Object.keys(resultDate).length == 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, workingDay_1.insertWorkingDay)()];
            case 2:
                resulData = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                resulData = resultDate[0];
                _b.label = 4;
            case 4:
                if (!turn._id) return [3 /*break*/, 6];
                console.log('ingreso');
                dataTurn = {
                    _id: turn === null || turn === void 0 ? void 0 : turn._id,
                    startDate: dateStr,
                    endDate: dateEnd,
                    description: turn.description,
                    type: turn.type,
                    status: turn.status,
                    statusPayment: 'Not_Payed',
                };
                return [4 /*yield*/, turn_1.default.findOneAndUpdate({ _id: turn._id }, dataTurn, { new: true })];
            case 5:
                responseUpdate = _b.sent();
                console.log('responseUpdate', responseUpdate);
                return [2 /*return*/, responseUpdate];
            case 6: return [4 /*yield*/, validTurn(turn.users, status)];
            case 7:
                validTurnR = _b.sent();
                if (Object.keys(validTurnR).length != 0) {
                    return [2 /*return*/, "TURN_ACTIVE"];
                }
                console.log('lego turn._id', turn);
                console.log('lego cfreara');
                dataTurn = {
                    startDate: dateStr,
                    endDate: dateEnd,
                    description: turn.description,
                    users: turn.users,
                    workingDay: resulData._id,
                    type: turn.type,
                    status: turn.status,
                    statusPayment: 'Not_Payed',
                };
                return [4 /*yield*/, turn_1.default.create(dataTurn)];
            case 8:
                responseInsert = _b.sent();
                console.log('datos ingreso', responseInsert);
                return [2 /*return*/, responseInsert];
        }
    });
}); };
exports.insertTurn = insertTurn;
var validTurn = function (userId, statusP) { return __awaiter(void 0, void 0, void 0, function () {
    var now, filter, status, users, formatoMap, dateStr, nextDate, responseTurn;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                now = new Date();
                filter = {};
                status = statusP || '';
                users = userId || '';
                if (status !== '') {
                    filter.status = status;
                }
                if (users !== '') {
                    filter.users = new ObjectId(users);
                }
                formatoMap = {
                    dd: now.getDate(),
                    mm: now.getMonth() + 1,
                    yy: now.getFullYear().toString().slice(-2),
                    yyyy: now.getFullYear()
                };
                dateStr = new Date(formatoMap.yyyy, formatoMap.mm - 1, formatoMap.dd, 0, 0, 0, 0);
                nextDate = new Date(formatoMap.yyyy, formatoMap.mm - 1, formatoMap.dd, 23, 59, 59, 999);
                filter.createdAt = { $gte: dateStr, $lt: nextDate };
                return [4 /*yield*/, turn_1.default.find({
                        createdAt: { $gte: dateStr, $lt: nextDate },
                        status: status,
                        users: userId
                    })];
            case 1:
                responseTurn = _a.sent();
                return [2 /*return*/, responseTurn];
        }
    });
}); };
exports.validTurn = validTurn;
var searchTurnForUser = function (turn) { return __awaiter(void 0, void 0, void 0, function () {
    var ObjectId, filter, _id, statusPayment, type, status, page, limit, startDate, endDate, users, response, dataStartDate, dataEndDate, dateStr, nextDate, responseItem, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ObjectId = mongoose_1.default.Types.ObjectId;
                filter = {};
                _id = turn._idTurn || null;
                statusPayment = turn.statusPayment || '';
                type = turn.type || '';
                status = turn.status || '';
                page = parseInt(turn.page, 10) || 1;
                limit = parseInt(turn.limit, 10) || 10;
                startDate = turn.startDate || '';
                endDate = turn.endDate || '';
                users = turn.users || '';
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
                // // return filter;
                // // 
                if (status !== '') {
                    filter.status = status;
                }
                if (statusPayment !== '') {
                    filter.statusPayment = statusPayment;
                }
                if (type !== '') {
                    filter.type = type;
                }
                if (users !== '') {
                    filter.users = new ObjectId(users);
                }
                // return filter;
                // console.log('Object.entries(order.date[0].estimateReceptionDate).length', order.date[0].estimateReceptionDate.firstDate)
                // return filter;
                // if ((turn.date.paymentDate?.firstDate !== null && turn.date.paymentDate?.firstDate !== undefined) 
                //     && (turn.date.paymentDate?.endDate !== null && turn.date.paymentDate?.endDate !== undefined)) {
                //     // console.log('llelsad', order?.estimateReceptionDate?.firstDate)
                //     const myArray = turn?.date.paymentDate?.firstDate.split("/");
                //     const myArray2 = turn?.date.paymentDate?.endDate.split("/");
                //     console.log('myArray', turn?.date.paymentDate?.firstDate.split("/"))
                //     filter.paymentDate = {
                //         $gte: new Date(myArray[0],myArray[1]-1,myArray[2],0,0,0),
                //         $lt: new Date(myArray2[0],myArray2[1]-1,myArray2[2],23,59,59)
                //     }
                // }
                if ((startDate !== '' && endDate !== '')) {
                    dataStartDate = startDate.split("/");
                    dataEndDate = endDate.split("/");
                    dateStr = new Date(dataStartDate[2], dataStartDate[0] - 1, dataStartDate[1], 0, 0, 0, 0);
                    nextDate = new Date(dataEndDate[2], dataEndDate[0] - 1, dataEndDate[1], 23, 59, 59, 999);
                    filter.createdAt = {
                        $gte: dateStr, $lt: nextDate
                    };
                }
                console.log('filter', filter);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, turn_1.default.aggregate([
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
                        { $skip: (page - 1) * limit || 0 },
                        { $limit: Number(limit) },
                    ])];
            case 2:
                responseItem = _a.sent();
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
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.searchTurnForUser = searchTurnForUser;
var getTurn = function (id) { return __awaiter(void 0, void 0, void 0, function () {
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
                // 63ec10592073ceeccba8bf9e
                valid = { _id: new ObjectId_1(id) };
                // valid = {"_id":{$eq:new ObjectId("63f7ebee0e2be4525a156238")}}
                // valid = {type: 'cleaning_products'};
                console.log('llego por aca', valid);
                return [4 /*yield*/, turn_1.default.aggregate([
                        { $match: valid },
                        { $lookup: { from: 'users', localField: 'users', foreignField: '_id', as: 'users' } },
                        { $lookup: { from: 'workingdays', localField: 'workingDay', foreignField: '_id', as: 'workingDay' } },
                    ])];
            case 2:
                responseItem = _a.sent();
                // const responseItem = await OperationBillSchemaModel.findOne({id}).populate('operationBills');
                // return responseItem;
                console.log('dataresponseItem', responseItem);
                if (Object.entries(responseItem).length > 0) {
                    response.docs = responseItem;
                    // response.totalDocs = responseItem[0].totalDocs;
                    // response.limit = limit;
                    // response.totalPages = Math.ceil( responseItem[0].totalDocs / limit );
                    // response.page = (page - 1) * limit || 0;
                    // response.prevPage = page;
                    // response.nextPage = (page + 1);
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
exports.getTurn = getTurn;
var getCars = function () { return __awaiter(void 0, void 0, void 0, function () {
    var responseItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, turn_1.default.find({})];
            case 1:
                responseItem = _a.sent();
                return [2 /*return*/, responseItem];
        }
    });
}); };
exports.getCars = getCars;
var getCar = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var responseItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, turn_1.default.findOne({ _id: id })];
            case 1:
                responseItem = _a.sent();
                return [2 /*return*/, responseItem];
        }
    });
}); };
exports.getCar = getCar;
var updateCar = function (id, data) { return __awaiter(void 0, void 0, void 0, function () {
    var responseItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, turn_1.default.findOneAndUpdate({ _id: id }, data, { new: true })];
            case 1:
                responseItem = _a.sent();
                return [2 /*return*/, responseItem];
        }
    });
}); };
exports.updateCar = updateCar;
var deleteCar = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var responseItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, turn_1.default.remove({ _id: id })];
            case 1:
                responseItem = _a.sent();
                return [2 /*return*/, responseItem];
        }
    });
}); };
exports.deleteCar = deleteCar;
function ISODate(arg0) {
    throw new Error("Function not implemented.");
}
