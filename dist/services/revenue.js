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
exports.getRevenueOther = exports.getRevenueTurn = exports.getRevenue = exports.getRevenues = exports.insertOrUpdateRevenueOther = exports.insertOrUpdateRevenueWorkingDay = void 0;
const revenue_1 = __importDefault(require("../models/revenue"));
const turn_1 = require("./turn");
const mongoose_1 = __importDefault(require("mongoose"));
const workingDay_1 = require("./workingDay");
const insertOrUpdateRevenueWorkingDay = (revenue) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const value = validPaidRevenue(revenue);
    if (value != "VALID_SUCCESS") {
        const resError = {
            codeHttp: '400',
            code: value,
            message: 'Error, debe verificar los montos enviados.'
        };
        return resError;
    }
    let dataF = [];
    if (Object.keys(revenue.files).length > 0) {
        (_a = revenue.files) === null || _a === void 0 ? void 0 : _a.forEach(element => {
            dataF.push({
                path: element.path,
                pathView: `${process.cwd()}/storage/${element.filename}`,
                filename: element.filename,
                size: element.size,
                mimetype: element.mimetype
            });
        });
        revenue.files = dataF;
        revenue.revenue.files = dataF;
    }
    if (revenue.id) {
        const resultUpdate = yield updateRevenue(revenue.id, revenue);
        return resultUpdate;
    }
    else {
        const validTurnR = yield (0, turn_1.validTurn)(revenue.users, 'Active');
        // console.log('data', validTurnR)
        // return validTurnR;
        if (Object.keys(validTurnR).length <= 0) {
            const resError = {
                codeHttp: '400',
                code: "NOT_FOUND_TURN",
                message: 'Para Ingresar un Cierre de Caja debes tener un turno activo en la jornada de hoy'
            };
            return resError;
        }
        console.log('inregos al revenue', revenue);
        revenue.revenue.turn = validTurnR[0]._id;
        revenue.revenue.workingDay = validTurnR[0].workingDay[0];
        const resultData = yield insertRevenue(revenue);
        return resultData;
    }
});
exports.insertOrUpdateRevenueWorkingDay = insertOrUpdateRevenueWorkingDay;
const insertOrUpdateRevenueOther = (revenue) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // return revenue
    if ((revenue === null || revenue === void 0 ? void 0 : revenue.revenue.totalAmount) <= 0) {
        return "NOT_FOUND_TOTALAMOUNT";
    }
    let dataF = [];
    if (Object.keys(revenue.files).length > 0) {
        (_a = revenue.files) === null || _a === void 0 ? void 0 : _a.forEach(element => {
            dataF.push({
                path: element.path,
                pathView: `${process.cwd()}/storage/${element.filename}`,
                filename: element.filename,
                size: element.size,
                mimetype: element.mimetype
            });
        });
        revenue.files = dataF;
        revenue.revenue.files = dataF;
    }
    // return revenue.id
    if (revenue.id) {
        const resultUpdate = yield updateRevenue(revenue.id, revenue);
        return resultUpdate;
    }
    else {
        let resulData = [];
        const resultDate = yield (0, workingDay_1.getWorkingForDate)();
        // return [resultDate];
        if (Object.keys(resultDate).length == 0) {
            resulData = yield (0, workingDay_1.insertWorkingDay)();
        }
        else {
            resulData = resultDate[0];
        }
        revenue.revenue.workingDay = resulData._id;
        const resultData = yield insertRevenue(revenue);
        return resultData;
    }
});
exports.insertOrUpdateRevenueOther = insertOrUpdateRevenueOther;
const insertRevenue = (revenue) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('inregos al insertRevenue');
    const responseInsert = yield revenue_1.default.create(revenue.revenue);
    console.log('result revenue insert', responseInsert);
    return responseInsert;
});
const updateRevenue = (revenueId, revenue) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const validRevenue = yield getRevenueValid(revenueId);
    if (Object.keys(validRevenue).length > 0) {
        const dataRevenue = {
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
        };
        let infoFile = [];
        if (Object.keys(revenue === null || revenue === void 0 ? void 0 : revenue.dataFiles).length > 0 && Object.keys(revenue === null || revenue === void 0 ? void 0 : revenue.files).length > 0) {
            yield ((_a = revenue === null || revenue === void 0 ? void 0 : revenue.dataFiles) === null || _a === void 0 ? void 0 : _a.forEach(element => {
                infoFile.push({
                    filename: element.filename,
                    path: element.path,
                    pathView: `${process.cwd()}/storage/${element.filename}`,
                    size: element.size,
                    mimetype: element.mimetype
                });
            }));
            yield ((_b = revenue === null || revenue === void 0 ? void 0 : revenue.files) === null || _b === void 0 ? void 0 : _b.forEach(element => {
                infoFile.push({
                    filename: element.filename,
                    path: element.path,
                    pathView: `${process.cwd()}/storage/${element.filename}`,
                    size: element.size,
                    mimetype: element.mimetype
                });
            }));
            dataRevenue.files = infoFile;
        }
        else if (Object.keys(revenue === null || revenue === void 0 ? void 0 : revenue.files).length > 0) {
            dataRevenue.files = revenue.files;
        }
        else if (Object.keys(revenue === null || revenue === void 0 ? void 0 : revenue.dataFiles).length > 0) {
            yield ((_c = revenue === null || revenue === void 0 ? void 0 : revenue.dataFiles) === null || _c === void 0 ? void 0 : _c.forEach(element => {
                infoFile.push({
                    filename: element.filename,
                    path: element.path,
                    pathView: `${process.cwd()}/storage/${element.filename}`,
                    size: element.size,
                    mimetype: element.mimetype
                });
            }));
            dataRevenue.files = infoFile;
        }
        const responseInsertR = yield revenue_1.default.findOneAndUpdate({ _id: revenueId }, dataRevenue, { new: true });
        return responseInsertR;
    }
});
const validRevenueOther = (users) => __awaiter(void 0, void 0, void 0, function* () {
    let now = new Date();
    const responseTurn = yield revenue_1.default.find({
        users: users
    });
    return responseTurn;
});
const validRevenueWorkingDay = (turn) => __awaiter(void 0, void 0, void 0, function* () {
    let now = new Date();
    const formatoMap = { dd: now.getDate(), mm: now.getMonth() + 1, yyyy: now.getFullYear() };
    var dateStr = new Date(formatoMap.yyyy, formatoMap.mm - 1, formatoMap.dd, 0, 0, 0, 0);
    var nextDate = new Date(formatoMap.yyyy, formatoMap.mm - 1, formatoMap.dd, 23, 59, 59, 999);
    const responseTurn = yield revenue_1.default.find({
        createdAt: { $gte: dateStr, $lt: nextDate },
        turns: turn
    });
    return responseTurn;
});
const validPaidRevenue = (revenue) => {
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
    const result = (Number((_a = revenue === null || revenue === void 0 ? void 0 : revenue.revenue) === null || _a === void 0 ? void 0 : _a.amountCash)
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
const createDetailRevenue = (revenueId, data) => __awaiter(void 0, void 0, void 0, function* () {
    // let dataDetailRevenue: any = [];
    // await data.detailRevenue.forEach(
    //     (item: any) => {
    //     const detailRevenue: DetailRevenue = {
    //         type: item.type,
    //         description: item.description,
    //         amount: item.amount,
    //         revenues: revenueId
    //     }
    //     dataDetailRevenue.push(detailRevenue)
    // });
    // const resultInsert = await  DetailRevenueModel.insertMany(dataDetailRevenue);
    // return resultInsert;
});
const getDetailRevenue = (revenueId) => __awaiter(void 0, void 0, void 0, function* () {
    // const resp = await DetailRevenueModel.find({
    //     revenue: revenueId
    // });
    // return resp;    
});
const getRevenueValid = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield revenue_1.default.find({
        id: id
    });
    return resp;
});
const getRevenues = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield revenue_1.default.find({});
    return responseItem;
});
exports.getRevenues = getRevenues;
const getRevenue = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let valid = {};
    let response = {
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
    // valid = {
    //     $text:{
    //         $search: `\"${id}\" authority key`
    //     },
    // }
    try {
        const ObjectI = mongoose_1.default.Types.ObjectId;
        // 63ec10592073ceeccba8bf9e
        valid = { _id: new ObjectI(id) };
        // valid = {type: 'cleaning_products'};
        console.log('llego por aca', valid);
        const responseItem = yield revenue_1.default.aggregate([
            { $match: valid },
            { $lookup: { from: 'users', localField: 'users', foreignField: '_id', as: 'users' } },
            { $lookup: { from: 'workingdays', localField: 'workingDay', foreignField: '_id', as: 'workingDay' } },
            { $lookup: { from: 'detailrevenues', localField: '_id', foreignField: 'revenues', as: 'detailRevenue' } },
        ]);
        // const responseItem = await OperationBillSchemaModel.findOne({id}).populate('operationBills');
        // return responseItem;
        console.log('dataresponseItem', responseItem);
        if (Object.entries(responseItem).length > 0) {
            response.docs = responseItem;
        }
        return response;
    }
    catch (error) {
        console.log('error', error);
    }
});
exports.getRevenue = getRevenue;
const getRevenueTurn = (revenue) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    let filter = {};
    const Objectid = mongoose_1.default.Types.ObjectId;
    // const _id = revenue._idTurn || null;
    // console.log('order id', revenue)
    // return order;
    // console.log('llego por aca')
    const turn = revenue.turn || '';
    // const workingDay = revenue.workingDay || '';
    const users = revenue.users || '';
    const page = parseInt(revenue.page, 10) || 1;
    const limit = parseInt(revenue.limit, 10) || 10;
    const type = revenue.type || '';
    const startDate = revenue.startDate || null;
    const endDate = revenue.endDate || null;
    let response = {
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
    console.log('typetype', type);
    // if (type !== "") {
    //     console.log('ingreso type')
    //     filter.type = type;
    // }
    console.log('filter', filter);
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
        const dataStartDate = startDate.split("/");
        const dataEndDate = endDate.split("/");
        var dateStr = new Date(dataStartDate[2], dataStartDate[0] - 1, dataStartDate[1], 0, 0, 0, 0);
        var nextDate = new Date(dataEndDate[2], dataEndDate[0] - 1, dataEndDate[1], 23, 59, 59, 999);
        filter.createdAt = {
            $gte: dateStr, $lt: nextDate
        };
    }
    else {
        let now = new Date();
        const formatoMap = {
            dd: now.getDate(),
            mm: now.getMonth(),
            yyyy: now.getFullYear()
        };
        var dateStr = new Date(formatoMap.yyyy, formatoMap.mm, formatoMap.dd, 0, 0, 0, 0);
        var nextDate = new Date(formatoMap.yyyy, formatoMap.mm, formatoMap.dd, 23, 59, 59, 999);
        filter.createdAt = {
            $gte: dateStr, $lt: nextDate
        };
    }
    try {
        const responseItem = yield revenue_1.default.aggregate([
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
        ]);
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
        return response;
    }
    catch (e) {
        console.log(e);
    }
});
exports.getRevenueTurn = getRevenueTurn;
const getRevenueOther = (revenue) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    let filter = {};
    const Objectid = mongoose_1.default.Types.ObjectId;
    // const _id = revenue._idTurn || null;
    // console.log('order id', revenue)
    // return order;
    const turn = revenue.turn || '';
    // const workingDay = revenue.workingDay || '';
    const users = revenue.users || '';
    const page = parseInt(revenue.page, 10) || 1;
    const limit = parseInt(revenue.limit, 10) || 10;
    const startDate = revenue.startDate || null;
    const endDate = revenue.endDate || null;
    let response = {
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
        const dataStartDate = startDate.split("/");
        const dataEndDate = endDate.split("/");
        var dateStr = new Date(dataStartDate[2], dataStartDate[0] - 1, dataStartDate[1], 0, 0, 0, 0);
        var nextDate = new Date(dataEndDate[2], dataEndDate[0] - 1, dataEndDate[1], 23, 59, 59, 999);
        filter.createdAt = {
            $gte: dateStr, $lt: nextDate
        };
    }
    else {
        let now = new Date();
        const formatoMap = {
            dd: now.getDate(),
            mm: now.getMonth(),
            yyyy: now.getFullYear()
        };
        var dateStr = new Date(formatoMap.yyyy, formatoMap.mm, formatoMap.dd, 0, 0, 0, 0);
        var nextDate = new Date(formatoMap.yyyy, formatoMap.mm, formatoMap.dd, 23, 59, 59, 999);
        filter.createdAt = {
            $gte: dateStr, $lt: nextDate
        };
    }
    try {
        const responseItem = yield revenue_1.default.aggregate([
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
        ]);
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
        return response;
    }
    catch (e) {
        console.log(e);
    }
});
exports.getRevenueOther = getRevenueOther;
//# sourceMappingURL=revenue.js.map