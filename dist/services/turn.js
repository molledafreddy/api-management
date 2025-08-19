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
exports.validTurn = exports.deleteCar = exports.updateCar = exports.getCar = exports.getCars = exports.getTurn = exports.searchTurnForUser = exports.insertTurn = void 0;
const turn_1 = __importDefault(require("../models/turn"));
const workingDay_1 = require("./workingDay");
const mongoose_1 = __importDefault(require("mongoose"));
// import {  } from "/workingDay";}
const ObjectId = mongoose_1.default.Types.ObjectId;
const insertTurn = (turn) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let resulData = [];
    const status = turn.status || '';
    let convertFechaStart = turn.startDate.toString();
    let resultStart = convertFechaStart.split(" ");
    let dataHoraStart = resultStart[1];
    let horaStart = dataHoraStart.split(":");
    let HStar = Number(horaStart[0]);
    let MNStar = Number(horaStart[1]);
    let SStar = Number(horaStart[2]);
    let dataFechaStart = resultStart[0];
    let fechaStart = dataFechaStart.split("/");
    let YStart = Number(fechaStart[2]);
    let MStart = Number(fechaStart[0]);
    let DStart = Number(fechaStart[1]);
    var dateStr = new Date(YStart, MStart - 1, DStart, HStar - 3, MNStar, SStar, 0);
    let convertFechaEnd = (_a = turn === null || turn === void 0 ? void 0 : turn.endDate) === null || _a === void 0 ? void 0 : _a.toString();
    let resultEnd = convertFechaEnd === null || convertFechaEnd === void 0 ? void 0 : convertFechaEnd.split(" ");
    let dataHoraEnd = resultEnd[1];
    let horaEnd = dataHoraEnd.split(":");
    let HEnd = Number(horaEnd[0]);
    let MNEnd = Number(horaEnd[1]);
    let SEnd = Number(horaEnd[2]);
    let dataFechaEnd = resultEnd[0];
    let fechaEnd = dataFechaEnd.split("/");
    let YEnd = Number(fechaEnd[2]);
    let MEnd = Number(fechaEnd[0]);
    let DEnd = Number(fechaEnd[1]);
    var dateEnd = new Date(YEnd, MEnd - 1, DEnd, HEnd - 3, MNEnd, SEnd, 0);
    const resultDate = yield (0, workingDay_1.getWorkingForDate)();
    if (Object.keys(resultDate).length == 0) {
        resulData = yield (0, workingDay_1.insertWorkingDay)();
    }
    else {
        resulData = resultDate[0];
    }
    // return dataTurn;
    if (turn._id) {
        console.log('ingreso');
        const dataTurn = {
            _id: turn === null || turn === void 0 ? void 0 : turn._id,
            startDate: dateStr,
            endDate: dateEnd,
            description: turn.description,
            type: turn.type,
            status: turn.status,
            statusPayment: 'Not_Payed',
        };
        // return dataTurn;
        const responseUpdate = yield turn_1.default.findOneAndUpdate({ _id: turn._id }, dataTurn, { new: true });
        console.log('responseUpdate', responseUpdate);
        return responseUpdate;
    }
    else {
        const validTurnR = yield validTurn(turn.users, status);
        if (Object.keys(validTurnR).length != 0) {
            return "TURN_ACTIVE";
        }
        console.log('lego turn._id', turn);
        console.log('lego cfreara');
        const dataTurn = {
            startDate: dateStr,
            endDate: dateEnd,
            description: turn.description,
            users: turn.users,
            workingDay: resulData._id,
            type: turn.type,
            status: turn.status,
            statusPayment: 'Not_Payed',
        };
        // return dataTurn;
        const responseInsert = yield turn_1.default.create(dataTurn);
        console.log('datos ingreso', responseInsert);
        return responseInsert;
    }
});
exports.insertTurn = insertTurn;
const validTurn = (userId, statusP) => __awaiter(void 0, void 0, void 0, function* () {
    let now = new Date();
    let filter = {};
    const status = statusP || '';
    const users = userId || '';
    if (status !== '') {
        filter.status = status;
    }
    if (users !== '') {
        filter.users = new ObjectId(users);
    }
    // console.log('fecha de ahora', now)
    const formatoMap = {
        dd: now.getDate(),
        mm: now.getMonth() + 1,
        yy: now.getFullYear().toString().slice(-2),
        yyyy: now.getFullYear()
    };
    var dateStr = new Date(formatoMap.yyyy, formatoMap.mm - 1, formatoMap.dd, 0, 0, 0, 0);
    var nextDate = new Date(formatoMap.yyyy, formatoMap.mm - 1, formatoMap.dd, 23, 59, 59, 999);
    filter.createdAt = { $gte: dateStr, $lt: nextDate };
    const responseTurn = yield turn_1.default.find({
        createdAt: { $gte: dateStr, $lt: nextDate },
        status: status,
        users: userId
    });
    return responseTurn;
});
exports.validTurn = validTurn;
const searchTurnForUser = (turn) => __awaiter(void 0, void 0, void 0, function* () {
    const ObjectId = mongoose_1.default.Types.ObjectId;
    let filter = {};
    const _id = turn._idTurn || null;
    // console.log('order id')
    // return order;
    const statusPayment = turn.statusPayment || '';
    const type = turn.type || '';
    const status = turn.status || '';
    const page = parseInt(turn.page, 10) || 1;
    const limit = parseInt(turn.limit, 10) || 10;
    const startDate = turn.startDate || '';
    const endDate = turn.endDate || '';
    const users = turn.users || '';
    // return  endDate;
    // return order;
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
        const dataStartDate = startDate.split("/");
        const dataEndDate = endDate.split("/");
        var dateStr = new Date(dataStartDate[2], dataStartDate[0] - 1, dataStartDate[1], 0, 0, 0, 0);
        var nextDate = new Date(dataEndDate[2], dataEndDate[0] - 1, dataEndDate[1], 23, 59, 59, 999);
        filter.createdAt = {
            $gte: dateStr, $lt: nextDate
        };
    }
    console.log('filter', filter);
    // return filter;
    try {
        const responseItem = yield turn_1.default.aggregate([
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
        ]);
        if (Object.entries(responseItem).length > 0) {
            response.docs = responseItem;
            response.totalDocs = responseItem[0].totalDocs;
            response.limit = limit;
            response.totalPages = Math.ceil(responseItem[0].totalDocs / limit);
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
exports.searchTurnForUser = searchTurnForUser;
const getTurn = (id) => __awaiter(void 0, void 0, void 0, function* () {
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
    try {
        // valid = {$eq: {_id:new mongoose.Types.ObjectId("63f7ebee0e2be4525a156238")}};
        const ObjectId = mongoose_1.default.Types.ObjectId;
        // 63ec10592073ceeccba8bf9e
        valid = { _id: new ObjectId(id) };
        // valid = {"_id":{$eq:new ObjectId("63f7ebee0e2be4525a156238")}}
        // valid = {type: 'cleaning_products'};
        console.log('llego por aca', valid);
        // await new mongoose.Types.ObjectId('6358403b25b29d9b3d42846c')
        const responseItem = yield turn_1.default.aggregate([
            { $match: valid },
            { $lookup: { from: 'users', localField: 'users', foreignField: '_id', as: 'users' } },
            { $lookup: { from: 'workingdays', localField: 'workingDay', foreignField: '_id', as: 'workingDay' } },
        ]);
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
        return response;
    }
    catch (error) {
        console.log('error', error);
    }
});
exports.getTurn = getTurn;
const getCars = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield turn_1.default.find({});
    return responseItem;
});
exports.getCars = getCars;
const getCar = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield turn_1.default.findOne({ _id: id });
    return responseItem;
});
exports.getCar = getCar;
const updateCar = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield turn_1.default.findOneAndUpdate({ _id: id }, data, { new: true });
    return responseItem;
});
exports.updateCar = updateCar;
const deleteCar = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield turn_1.default.remove({ _id: id });
    return responseItem;
});
exports.deleteCar = deleteCar;
function ISODate(arg0) {
    throw new Error("Function not implemented.");
}
//# sourceMappingURL=turn.js.map