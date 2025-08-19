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
exports.validOrderProvider = exports.insertOrUpdateOrder = exports.searchOrderDetail = exports.getOrderDetail = exports.searchOrderPaitOut = exports.getOrder = exports.getOrders = void 0;
const order_1 = __importDefault(require("../models/order"));
const logisticOrder_1 = __importDefault(require("../models/logisticOrder"));
const paymentTypeHasEgress_1 = __importDefault(require("../models/paymentTypeHasEgress"));
const provider_1 = require("./provider");
const paymentType_1 = require("./paymentType");
const workingDay_1 = require("./workingDay");
const egress_1 = __importDefault(require("../models/egress"));
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield order_1.default.find({});
    console.log('responseItem', responseItem);
    return responseItem;
});
exports.getOrders = getOrders;
const getOrder = (_id) => __awaiter(void 0, void 0, void 0, function* () {
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
        const ObjectId = mongoose_1.default.Types.ObjectId;
        valid = { _id: new ObjectId(_id) };
        const responseItem = yield order_1.default.aggregate([
            { $match: valid },
            { $lookup: { from: 'egresses', localField: '_id', foreignField: 'orders', as: 'egress' } },
            { $lookup: { from: 'logisticorders', localField: '_id', foreignField: 'orders', as: 'logisticOrder' } },
            { $lookup: { from: "providers", localField: "providers", foreignField: "_id", as: "providers" }, },
        ]);
        if (Object.entries(responseItem).length > 0) {
            response.docs = responseItem;
        }
        return response;
    }
    catch (error) {
        console.log('error', error);
    }
});
exports.getOrder = getOrder;
const searchOrderDetail = (order) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
    const ObjectId = mongoose_1.default.Types.ObjectId;
    // return  order;
    console.log('date', order);
    let filter = {};
    const _id = order._idOrder || null;
    // console.log('order id')
    // return order;
    const providers = order.providers || '';
    const paymentMethod = order.paymentMethod || '';
    const status = order.status || '';
    const page = parseInt(order.page, 10) || 1;
    const limit = parseInt(order.limit, 10) || 10;
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
        // console.log('llelsad', order?.estimateReceptionDate?.firstDate)
        const myArray = (_e = order === null || order === void 0 ? void 0 : order.date.estimateReceptionDate) === null || _e === void 0 ? void 0 : _e.firstDate.split("/");
        const myArray2 = (_f = order === null || order === void 0 ? void 0 : order.date.estimateReceptionDate) === null || _f === void 0 ? void 0 : _f.endDate.split("/");
        // console.log('lleog myArraysss', myArray)
        // console.log('lleog myArray2', myArray2)
        filter.EstimateReceptionDate = {
            $gte: new Date(myArray[2], myArray[0] - 1, myArray[1], 0, 0, 0, 0),
            $lt: new Date(myArray2[2], myArray2[0] - 1, myArray2[1], 23, 59, 59, 999)
        };
    }
    if ((((_g = order.date.creditPaymentDate) === null || _g === void 0 ? void 0 : _g.firstDate) !== null && ((_h = order.date.creditPaymentDate) === null || _h === void 0 ? void 0 : _h.firstDate) !== undefined)
        && (((_j = order.date.creditPaymentDate) === null || _j === void 0 ? void 0 : _j.endDate) !== null && ((_k = order.date.creditPaymentDate) === null || _k === void 0 ? void 0 : _k.endDate) !== undefined)) {
        // console.log('llelsad', order?.estimateReceptionDate?.firstDate)
        const myArray = (_l = order === null || order === void 0 ? void 0 : order.date.creditPaymentDate) === null || _l === void 0 ? void 0 : _l.firstDate.split("/");
        const myArray2 = (_m = order === null || order === void 0 ? void 0 : order.date.creditPaymentDate) === null || _m === void 0 ? void 0 : _m.endDate.split("/");
        filter.creditPaymentDate = {
            $gte: new Date(myArray[0], myArray[1] - 1, myArray[2], 0, 0, 0),
            $lt: new Date(myArray2[0], myArray2[1] - 1, myArray2[2], 23, 59, 999)
        };
    }
    if (((((_o = order.date.paymentDate) === null || _o === void 0 ? void 0 : _o.firstDate) !== null && ((_p = order.date.paymentDate) === null || _p === void 0 ? void 0 : _p.firstDate) !== undefined))
        && (((_q = order.date.paymentDate) === null || _q === void 0 ? void 0 : _q.endDate) !== null && ((_r = order.date.paymentDate) === null || _r === void 0 ? void 0 : _r.endDate) !== undefined)) {
        const myArray = (_s = order === null || order === void 0 ? void 0 : order.date.paymentDate) === null || _s === void 0 ? void 0 : _s.firstDate.split("/");
        const myArray2 = (_t = order === null || order === void 0 ? void 0 : order.date.paymentDate) === null || _t === void 0 ? void 0 : _t.endDate.split("/");
        filter.paymentDate = {
            $gte: new Date(myArray[2], myArray[0] - 1, myArray[1], 0, 0, 0, 0),
            $lt: new Date(myArray2[2], myArray2[0] - 1, myArray2[1], 23, 59, 59, 999)
        };
    }
    if ((((_u = order.date.receptionDate) === null || _u === void 0 ? void 0 : _u.firstDate) !== null && ((_v = order.date.receptionDate) === null || _v === void 0 ? void 0 : _v.firstDate) !== undefined)
        && (((_w = order.date.receptionDate) === null || _w === void 0 ? void 0 : _w.endDate) !== null && ((_x = order.date.receptionDate) === null || _x === void 0 ? void 0 : _x.endDate) !== undefined)) {
        const myArray = (_y = order === null || order === void 0 ? void 0 : order.date.receptionDate) === null || _y === void 0 ? void 0 : _y.firstDate.split("/");
        const myArray2 = (_z = order === null || order === void 0 ? void 0 : order.date.receptionDate) === null || _z === void 0 ? void 0 : _z.endDate.split("/");
        filter.receptionDate = {
            $gte: new Date(myArray[2], myArray[0] - 1, myArray[1], 0, 0, 0, 0),
            $lt: new Date(myArray2[2], myArray2[0] - 1, myArray2[1], 23, 59, 59, 999)
        };
    }
    // return filter
    // console.log('order.date', order.date)    
    if ((((_0 = order.date.orderDate) === null || _0 === void 0 ? void 0 : _0.firstDate) !== null && ((_1 = order.date.orderDate) === null || _1 === void 0 ? void 0 : _1.firstDate) !== undefined)
        && (((_2 = order.date.orderDate) === null || _2 === void 0 ? void 0 : _2.endDate) !== null && ((_3 = order.date.orderDate) === null || _3 === void 0 ? void 0 : _3.endDate) !== undefined)) {
        const myArray = (_4 = order === null || order === void 0 ? void 0 : order.date.orderDate) === null || _4 === void 0 ? void 0 : _4.firstDate.split("/");
        const myArray2 = (_5 = order === null || order === void 0 ? void 0 : order.date.orderDate) === null || _5 === void 0 ? void 0 : _5.endDate.split("/");
        filter.orderDate = {
            $gte: new Date(myArray[2], myArray[0] - 1, myArray[1], 0, 0, 0, 0),
            $lt: new Date(myArray2[2], myArray2[0] - 1, myArray2[1], 23, 59, 59, 999)
        };
    }
    // return filter;
    // console.log('filter', filter)
    try {
        const responseItem = yield order_1.default.aggregate([
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
exports.searchOrderDetail = searchOrderDetail;
const searchOrderPaitOut = (order) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const ObjectId = mongoose_1.default.Types.ObjectId;
    // return  order;
    // console.log('date', order)
    let filter = {};
    const _id = order._idOrder || null;
    // console.log('order id')
    // return order;
    const status = order.status || '';
    const page = parseInt(order.page, 10) || 1;
    const limit = parseInt(order.limit, 10) || 10;
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
        nextPage: 0,
        sum: 0
    };
    if (order.status !== '') {
        filter.status = status;
    }
    if (((order.startDate !== 'null' && order.startDate !== ''))
        && (order.endDate !== 'null' && order.endDate !== '')) {
        console.log('imgreso a la validacion fecha', order.startDate);
        const myArray = order === null || order === void 0 ? void 0 : order.startDate.split("/");
        const myArray2 = order === null || order === void 0 ? void 0 : order.endDate.split("/");
        filter.paymentDate = {
            $gte: new Date(myArray[2], myArray[0] - 1, myArray[1], 0, 0, 0, 0),
            $lt: new Date(myArray2[2], myArray2[0] - 1, myArray2[1], 23, 59, 59, 999)
        };
    }
    else {
        // console.log('ingrso al else')
        let now = new Date();
        const formatoMap = {
            dd: now.getDate(),
            mm: now.getMonth(),
            yyyy: now.getFullYear()
        };
        filter.paymentDate = {
            $gte: new Date(formatoMap.yyyy, formatoMap.mm, formatoMap.dd, 0, 0, 0, 0),
            $lt: new Date(formatoMap.yyyy, formatoMap.mm, formatoMap.dd, 23, 59, 59, 999)
        };
    }
    try {
        let responseSum = [];
        responseSum = yield order_1.default.aggregate([
            { $match: filter },
            { $group: { _id: null, sum: { $sum: "$amountPaid" } } }
        ]);
        const responseItem = yield order_1.default.aggregate([
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
        ]);
        if (Object.entries(responseItem).length > 0) {
            response.docs = responseItem;
            response.sum = (_a = responseSum[0]) === null || _a === void 0 ? void 0 : _a.sum;
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
exports.searchOrderPaitOut = searchOrderPaitOut;
const getOrderDetail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let filtro = {};
    let now = new Date();
    const formatoMap = {
        dd: now.getDate(),
        mm: now.getMonth() + 1,
        yy: now.getFullYear().toString().slice(-2),
        yyyy: now.getFullYear()
    };
    var dateStr = new Date(formatoMap.yyyy, formatoMap.mm, formatoMap.dd, 0, 0, 0);
    var nextDate = new Date(formatoMap.yyyy, formatoMap.mm, formatoMap.dd, 23, 59, 59);
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
    try {
        const responseItem = yield order_1.default.aggregate([
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
        ]);
        return responseItem;
    }
    catch (e) {
        console.log(e);
    }
});
exports.getOrderDetail = getOrderDetail;
const validPaidOrder = (order) => {
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
    let valueAmount = 0;
    valueAmount = order.egress.paymentHasEgress.filter(d => parseInt(d.paymentAmount)).map(d => parseInt(d.paymentAmount)).reduce((a, b) => a + b, 0);
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
const insertOrUpdateOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // return [order.egress.paymentHasEgress as undefined];
    // permite validar que el proveedor exista en la base de datos
    // const resultGet =  getOrders();
    // const resultGet = getOrder(order.id as string);
    // return  resultGet;
    let resultProvider = [];
    resultProvider = yield (0, provider_1.getProvider)(order.providers);
    // return resultProvider;
    if (Object.keys(resultProvider).length == 0) {
        return "PROVEEDOR_NOT_FOUND";
    }
    // return [order];
    if (order.status != "paid_out"
        && order.estimatedAmount <= 0) {
        return "NOT_FOUND_ESTIMATED_AMOUNT";
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
        const value = validPaidOrder(order);
        if (value != "VALID_SUCCESS") {
            return value;
        }
    }
    // return [order];
    // return 'pas la validacion';
    //permite validar si existe una joranada de trabajo para relacionar a la orden
    let resulData = [];
    const resultDate = yield (0, workingDay_1.getWorkingForDate)();
    // return [resultDate];
    if (Object.keys(resultDate).length == 0) {
        resulData = yield (0, workingDay_1.insertWorkingDay)();
    }
    else {
        resulData = resultDate[0];
    }
    // return resulData._id;
    // return [order.id];
    let dataFiles = [];
    // console.log('archivos', operation.files)
    if (Object.keys(order.files).length > 0) {
        console.log('ingreso tiene archivos');
        (_a = order.files) === null || _a === void 0 ? void 0 : _a.forEach(element => {
            // console.log('element',element)
            dataFiles.push({
                path: element.path,
                pathView: `${process.cwd()}/storage/${element.filename}`,
                filename: element.filename,
                size: element.size,
                mimetype: element.mimetype
            });
        });
        order.files = dataFiles;
    }
    // return [order._id];
    if (order._id) {
        // return "ingreso al if realizara la actualizacion";
        // console.log('ciene con data')
        // return ["actualizacion",resulData._id, order._id];
        const resultUpdate = yield updateOrder(order._id, resulData._id, order);
        return resultUpdate;
    }
    else {
        // return "ingreso al else";
        // return order;
        // console.log('vieen vacio')
        // return ["vieen vacio", resulData._id];
        const resultData = yield insertOrder(resulData._id, order);
        return resultData;
    }
    return order;
});
exports.insertOrUpdateOrder = insertOrUpdateOrder;
const insertOrder = (idWorkingDay, data) => __awaiter(void 0, void 0, void 0, function* () {
    // return "valores devueltos";
    const responseInsertOrder = yield order_1.default.create(data);
    console.log('responseInsertOrder', responseInsertOrder);
    // return ['orden creada', responseInsertOrde]; 
    if (responseInsertOrder._id) {
        const dataLogistic = {
            orders: responseInsertOrder._id,
            users: data.users,
            workingDay: idWorkingDay,
            descriptionLogistic: data === null || data === void 0 ? void 0 : data.descriptionLogistic,
            status: data === null || data === void 0 ? void 0 : data.status
        };
        const responseInsert = yield logisticOrder_1.default.create(dataLogistic);
        console.log('responseInsert Logistinc', responseInsert);
        // if (data.status === 'paid_out') {
        // console.log('ingreso aca createEgress')
        createEgress(responseInsertOrder._id, data);
        // }  
    }
    return responseInsertOrder;
});
const createEgress = (orderId, data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const validEgress = yield getEgress(orderId);
    // console.log('validEgress', validEgress)
    if (Object.keys(validEgress).length == 0) {
        console.log("ingreso se creara un abono");
        console.log("ingreso se creara un abono");
        console.log("ingreso se creara un abono");
        console.log("ingreso se creara un abono");
        const dataEgress = {
            invoiceNumber: (_a = data.egress) === null || _a === void 0 ? void 0 : _a.invoiceNumber,
            amount: (_b = data.egress) === null || _b === void 0 ? void 0 : _b.amount,
            orders: orderId,
            description: data === null || data === void 0 ? void 0 : data.descriptionPayment,
            files: data === null || data === void 0 ? void 0 : data.files,
            type: 'orders',
            paymentDate: data === null || data === void 0 ? void 0 : data.paymentDate,
        };
        const responseInsertE = yield egress_1.default.create(dataEgress);
        // let dataPayment = Array<paymentTypeHasEgress>;
        // console.log('responseInsertE EgressModel', responseInsertE)
        if (Object.keys((_c = data.egress) === null || _c === void 0 ? void 0 : _c.paymentHasEgress).length > 0) {
            const resultPayments = yield (0, paymentType_1.getPaymentTypes)();
            if (Object.keys(resultPayments).length > 0) {
                let dataPayment = [];
                yield ((_e = (_d = data.egress) === null || _d === void 0 ? void 0 : _d.paymentHasEgress) === null || _e === void 0 ? void 0 : _e.forEach((item) => {
                    for (let i = 0; i < resultPayments.length; i++) {
                        const type = resultPayments[i];
                        if (type.name === item.payments) {
                            item.payments = type._id;
                        }
                    }
                    const dataPaymentTypeHasEgress = {
                        payments: item.payments,
                        egress: responseInsertE._id,
                        paymentAmount: item.paymentAmount,
                    };
                    dataPayment.push(dataPaymentTypeHasEgress);
                }));
                const responseInsertP = yield paymentTypeHasEgress_1.default.insertMany(dataPayment);
                console.log('responseInsertP', responseInsertP);
            }
        }
        return dataEgress;
    }
});
const getEgress = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield egress_1.default.find({
        orders: orderId
    });
    console.log('consulta de egresos', resp);
    return resp;
});
const updateOrder = (id, idWorkingDay, data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('updateOrder', data);
    const responseItem = yield order_1.default.findOneAndUpdate({ _id: id }, data, { new: true });
    console.log('responseItem actualizacion de orden', responseItem);
    // return responseItem;
    // id as string
    const resultGet = yield getOrder(id);
    // return  [resultGet?.status];
    // if (resultGet?.status != data.status) {
    const dataLogistic = {
        orders: data === null || data === void 0 ? void 0 : data._id,
        users: data.users,
        workingDay: idWorkingDay,
        descriptionLogistic: data === null || data === void 0 ? void 0 : data.descriptionLogistic,
        status: data.status
    };
    const responseInsert = yield logisticOrder_1.default.create(dataLogistic);
    // console.log('se realizo la insercion logistica', responseInsert)
    // return ['responseInsert', responseInsert];
    // }
    const validEgress = yield getEgress(id);
    if (Object.keys(validEgress).length > 0) {
        // console.log('ingreso tiene actualizacion')
        const resultEgress = yield updateEgress(id, data);
        return resultEgress;
    }
    else {
        // console.log('ingreso else debe crear egreseo')
        createEgress(id, data);
    }
    // if (data.status === 'paid_out') {
    // return resultEgress;
    // }
    return responseItem;
});
const updateEgress = (orderId, data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    // console.log('valor', data)
    // return data;
    const validEgress = yield getEgress(orderId);
    console.log('data orden', data);
    console.log('validEgress inreso a la actualizacion del ingreso', orderId, validEgress);
    if (Object.keys(validEgress).length > 0) {
        // console.log("ingreso se creara un abono")
        // console.log("ingreso se creara un abono")
        console.log("ingreso se creara un abono data?.dataFiles", data === null || data === void 0 ? void 0 : data.dataFiles);
        console.log("ingreso se creara un abono data?.files", data === null || data === void 0 ? void 0 : data.files);
        const dataEgress = {
            invoiceNumber: (_a = data.egress) === null || _a === void 0 ? void 0 : _a.invoiceNumber,
            orders: orderId,
            description: data === null || data === void 0 ? void 0 : data.descriptionPayment,
            amount: data === null || data === void 0 ? void 0 : data.amountPaid,
            type: 'orders',
            paymentDate: data === null || data === void 0 ? void 0 : data.paymentDate,
        };
        console.log('modelo egreso', dataEgress);
        let infoFile = [];
        if (Object.keys(data === null || data === void 0 ? void 0 : data.dataFiles).length > 0 && Object.keys(data === null || data === void 0 ? void 0 : data.files).length > 0) {
            // infoFile.push(data?.files);
            console.log('ingreso tiene datafiles y files');
            yield ((_b = data === null || data === void 0 ? void 0 : data.dataFiles) === null || _b === void 0 ? void 0 : _b.forEach(element => {
                infoFile.push({
                    filename: element.filename,
                    path: element.path,
                    pathView: `${process.cwd()}/storage/${element.filename}`,
                    size: element.size,
                    mimetype: element.mimetype
                });
            }));
            yield ((_c = data === null || data === void 0 ? void 0 : data.files) === null || _c === void 0 ? void 0 : _c.forEach(element => {
                infoFile.push({
                    filename: element.filename,
                    path: element.path,
                    pathView: `${process.cwd()}/storage/${element.filename}`,
                    size: element.size,
                    mimetype: element.mimetype
                });
            }));
            console.log('infoFiles', infoFile);
            // infoFile.push(data?.files as any);
            dataEgress.files = infoFile;
            // console.log('infoFiles dataEgress', dataEgress)
        }
        else if (Object.keys(data === null || data === void 0 ? void 0 : data.files).length > 0) {
            // infoFile = data?.files as any;
            console.log('ingreso tiene files');
            dataEgress.files = data.files;
        }
        else if (Object.keys(data === null || data === void 0 ? void 0 : data.dataFiles).length > 0) {
            yield ((_d = data === null || data === void 0 ? void 0 : data.dataFiles) === null || _d === void 0 ? void 0 : _d.forEach(element => {
                infoFile.push({
                    filename: element.filename,
                    path: element.path,
                    pathView: `${process.cwd()}/storage/${element.filename}`,
                    size: element.size,
                    mimetype: element.mimetype
                });
            }));
            dataEgress.files = infoFile;
        }
        console.log("dataEgress", dataEgress);
        const responseInsertE = yield egress_1.default.findOneAndUpdate({ _id: (_e = data === null || data === void 0 ? void 0 : data.egress) === null || _e === void 0 ? void 0 : _e._id }, dataEgress, { new: true });
        console.log('resultado egresos', responseInsertE);
        const deleteI = yield paymentTypeHasEgress_1.default.deleteMany({ egress: (_f = data === null || data === void 0 ? void 0 : data.egress) === null || _f === void 0 ? void 0 : _f._id });
        console.log('data.egress?.paymentHasEgress', (_g = data.egress) === null || _g === void 0 ? void 0 : _g.paymentHasEgress);
        if (Object.keys((_h = data.egress) === null || _h === void 0 ? void 0 : _h.paymentHasEgress).length > 0) {
            // let dataPayment: any = [];
            const resultPayments = yield (0, paymentType_1.getPaymentTypes)();
            if (Object.keys(resultPayments).length > 0) {
                let dataPayment = [];
                yield ((_k = (_j = data.egress) === null || _j === void 0 ? void 0 : _j.paymentHasEgress) === null || _k === void 0 ? void 0 : _k.forEach((item) => {
                    var _a;
                    for (let i = 0; i < resultPayments.length; i++) {
                        const type = resultPayments[i];
                        if (type.name === item.payments) {
                            item.payments = type._id;
                        }
                    }
                    // 641b70dd865328bce57e31e8
                    const dataPaymentTypeHasEgress = {
                        payments: item.payments,
                        egress: (_a = data === null || data === void 0 ? void 0 : data.egress) === null || _a === void 0 ? void 0 : _a._id,
                        paymentAmount: item.paymentAmount,
                    };
                    dataPayment.push(dataPaymentTypeHasEgress);
                }));
                const responseInsertP = yield paymentTypeHasEgress_1.default.insertMany(dataPayment);
                console.log('responseInsertP', responseInsertP);
            }
        }
        return dataEgress;
    }
    else {
        console.log(' n consigio egreso');
        console.log(' n consigio egreso');
        console.log(' n consigio egreso');
        console.log(' n consigio egreso');
    }
});
const validOrderProvider = (provider) => __awaiter(void 0, void 0, void 0, function* () {
    const responseTurn = yield order_1.default.find({
        $or: [{ status: { $gt: "requested" } }, { status: { $gt: "no_received" } }],
        providers: provider
    });
    return responseTurn;
});
exports.validOrderProvider = validOrderProvider;
//# sourceMappingURL=order.js.map