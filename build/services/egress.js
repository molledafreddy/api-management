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
exports.validOrderProvider = exports.insertOrUpdateOrder = exports.searchEgress = exports.getOrderDetail = exports.searchOrderPaitOut = exports.getOrder = exports.getOrders = void 0;
var order_1 = __importDefault(require("../models/order"));
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
var searchEgress = function (egress) { return __awaiter(void 0, void 0, void 0, function () {
    var ObjectId, filter, _id, orders, operationBills, invoiceNumber, page, limit, response, myArray, myArray2, now, formatoMap, dateStr, nextDate, responseSum, responseItem, e_1;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                ObjectId = mongoose_1.default.Types.ObjectId;
                filter = {};
                _id = egress._idOrder || null;
                orders = egress.orders || '';
                operationBills = egress.operationBills || '';
                invoiceNumber = egress.invoiceNumber || '';
                page = parseInt(egress.page, 10) || 1;
                limit = parseInt(egress.limit, 10) || 10;
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
                    sum: 0,
                    nextPage: 0
                };
                if (_id !== null) {
                    filter._id = new ObjectId(_id);
                }
                // return filter;
                // 
                if (orders !== '') {
                    filter.orders = new ObjectId(orders);
                }
                if (operationBills !== '') {
                    filter.operationBills = new ObjectId(operationBills);
                }
                if (invoiceNumber !== '') {
                    filter.invoiceNumber = invoiceNumber;
                }
                if ((((_a = egress === null || egress === void 0 ? void 0 : egress.paymentDate) === null || _a === void 0 ? void 0 : _a.firstDate) !== null && ((_b = egress === null || egress === void 0 ? void 0 : egress.paymentDate) === null || _b === void 0 ? void 0 : _b.firstDate) !== undefined && ((_c = egress === null || egress === void 0 ? void 0 : egress.paymentDate) === null || _c === void 0 ? void 0 : _c.firstDate) !== '')
                    && ((_d = egress === null || egress === void 0 ? void 0 : egress.paymentDate) === null || _d === void 0 ? void 0 : _d.endDate) !== null && ((_e = egress === null || egress === void 0 ? void 0 : egress.paymentDate) === null || _e === void 0 ? void 0 : _e.endDate) !== undefined && ((_f = egress === null || egress === void 0 ? void 0 : egress.paymentDate) === null || _f === void 0 ? void 0 : _f.endDate) !== '') {
                    myArray = (_g = egress === null || egress === void 0 ? void 0 : egress.paymentDate) === null || _g === void 0 ? void 0 : _g.firstDate.split("/");
                    myArray2 = (_h = egress === null || egress === void 0 ? void 0 : egress.paymentDate) === null || _h === void 0 ? void 0 : _h.endDate.split("/");
                    //     console.log('egress?.paymentDate?.startDate',myArray)
                    // console.log('egress?.paymentDate?.endDate', myArray2)
                    filter.paymentDate = {
                        $gte: new Date(myArray[2], myArray[0] - 1, myArray[1], 0, 0, 0),
                        $lt: new Date(myArray2[2], myArray2[0] - 1, myArray2[1], 23, 59, 999)
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
                    filter.paymentDate = {
                        $gte: dateStr, $lt: nextDate
                    };
                }
                _k.label = 1;
            case 1:
                _k.trys.push([1, 4, , 5]);
                responseSum = [];
                return [4 /*yield*/, egress_1.default.aggregate([
                        { $match: filter },
                        { $group: { _id: null, sum: { $sum: "$amount" } } }
                    ])];
            case 2:
                responseSum = _k.sent();
                return [4 /*yield*/, egress_1.default.aggregate([
                        { $match: filter },
                        { $lookup: { from: 'orders', localField: 'orders', foreignField: '_id', as: 'orders' } },
                        { $lookup: { from: 'operationBills', localField: 'operationBills', foreignField: '_id', as: 'operationBills' } },
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
                    ])];
            case 3:
                responseItem = _k.sent();
                if (Object.entries(responseItem).length > 0) {
                    response.docs = responseItem;
                    response.totalDocs = responseItem[0].totalDocs;
                    response.limit = limit;
                    response.sum = (_j = responseSum[0]) === null || _j === void 0 ? void 0 : _j.sum;
                    response.totalPages = Math.ceil(responseItem[0].totalDocs / limit);
                    response.page = (page - 1) * limit || 0;
                    response.prevPage = page;
                    response.nextPage = (page + 1);
                }
                return [2 /*return*/, response];
            case 4:
                e_1 = _k.sent();
                console.log(e_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.searchEgress = searchEgress;
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
                        { $sort: { 'createdAt': -1 } },
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
                    status: 'pagado',
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
    if (order.status === "pagado" && order.amountPaid <= 0) {
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
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
exports.insertOrUpdateOrder = insertOrUpdateOrder;
// const insertOrder = async (idWorkingDay: string, data: RequestOrder) => {
//     // return "valores devueltos";
//     const responseInsertOrder = await OrderModel.create(data);
//     console.log('responseInsertOrder', responseInsertOrder)
//     // return ['orden creada', responseInsertOrde]; 
//     if (responseInsertOrder._id) {
//         const dataLogistic: LogisticOrder = {
//             orders: responseInsertOrder._id as string,
//             users: data.users,
//             workingDay: idWorkingDay,
//             descriptionLogistic: data?.descriptionLogistic as any,
//             status: data?.status
//         }
//         const responseInsert = await LogisticOrderModel.create(dataLogistic);
//         console.log('responseInsert Logistinc', responseInsert)
//         // if (data.status === 'paid_out') {
//             // console.log('ingreso aca createEgress')
//             createEgress(responseInsertOrder._id as string, data)
//         // }  
//     }
//     return responseInsertOrder;
// }
// const createEgress = async (orderId: string, data: RequestOrder) => {
//     const validEgress = await getEgress(orderId)
//     // console.log('validEgress', validEgress)
//     if (Object.keys(validEgress).length == 0) {
//         console.log("ingreso se creara un abono")
//         console.log("ingreso se creara un abono")
//         console.log("ingreso se creara un abono")
//         console.log("ingreso se creara un abono")
//         const dataEgress: Egress = {
//             invoiceNumber: data.egress?.invoiceNumber,
//             amount: data.egress?.amount,
//             orders: orderId,
//             description: data?.descriptionPayment as string,
//             files: data?.files
//         }
//         const responseInsertE = await EgressModel.create(dataEgress);
//         // let dataPayment = Array<paymentTypeHasEgress>;
//         console.log('responseInsertE EgressModel', responseInsertE)
//         if (Object.keys(data.egress?.paymentHasEgress as any).length > 0) {
//             let dataPayment: any = [];
//             await data.egress?.paymentHasEgress?.forEach(
//                 (item) => {
//                 const dataPaymentTypeHasEgress: paymentTypeHasEgress = {
//                     payments: item.payments,
//                     egress: responseInsertE._id as string,
//                     paymentAmount: item.paymentAmount ,
//                 }
//                 dataPayment.push(dataPaymentTypeHasEgress)
//             });
//             const responseInsertP = await paymentTypeHasEgressModel.insertMany(dataPayment);
//             console.log('responseInsertP', responseInsertP)
//         }
//         return dataEgress; 
//         //   await data.egress?.paymentHasEgress?.forEach(function (value) {
//         // console.log(value);
//         // });
//         // const dataPaymentTypeHasEgress: paymentTypeHasEgress = {
//         //     payments: orderId,
//         //     egress: responseInsertE._id as string,
//         //     amount: '20000' ,
//         // }
//         // const responseInsertP = await paymentTypeHasEgressModel.create(dataPaymentTypeHasEgress);
//         // return dataEgress; 
//     }
// }
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
// const updateOrder = async (id:string, idWorkingDay: string, data: RequestOrder) => {
//     console.log('updateOrder', data)
//     const responseItem = await OrderModel.findOneAndUpdate(
//         {_id: id },
//         data,
//         { new: true }
//     );
//     console.log('responseItem actualizacion de orden', responseItem);
//     // return responseItem;
//     // id as string
//     const resultGet = await getOrder(id as string);
//     // return  [resultGet?.status];
//     // if (resultGet?.status != data.status) {
//         const dataLogistic: LogisticOrder = {
//             orders: data?._id,
//             users: data.users,
//             workingDay: idWorkingDay,
//             descriptionLogistic: data?.descriptionLogistic as any,
//             status: data.status
//         }
//         const responseInsert = await LogisticOrderModel.create(dataLogistic);
//         // console.log('se realizo la insercion logistica', responseInsert)
//         // return ['responseInsert', responseInsert];
//     // }
//     const validEgress = await getEgress(id)
//     if (Object.keys(validEgress).length > 0) {
//         // console.log('ingreso tiene actualizacion')
//         const resultEgress = await updateEgress(id as string, data); 
//     } else {
//         // console.log('ingreso else debe crear egreseo')
//         createEgress(id as string as string, data)
//     }
//     // if (data.status === 'paid_out') {
//         // return resultEgress;
//     // }
//     return responseItem;
// }
// const updateEgress = async (orderId: string, data: RequestOrder) => {
//     // console.log('valor', data)
//     // return data;
//     const validEgress = await getEgress(orderId)
//     console.log('data orden', data)
//     console.log('validEgress inreso a la actualizacion del ingreso',orderId, validEgress)
//     if (Object.keys(validEgress).length > 0) {
//         // console.log("ingreso se creara un abono")
//         // console.log("ingreso se creara un abono")
//         console.log("ingreso se creara un abono data?.dataFiles", data?.dataFiles)
//         console.log("ingreso se creara un abono data?.files", data?.files)
//         const dataEgress: Egress = {
//             invoiceNumber: data.egress?.invoiceNumber,
//             orders: orderId,
//             description: data?.descriptionPayment,
//             amount: data?.amountPaid
//         }
//         console.log('modelo egreso', dataEgress)
//         let infoFile: any = [];
//         if (Object.keys(data?.dataFiles as any).length > 0 && Object.keys(data?.files as any).length > 0) {
//             // infoFile.push(data?.files);
//             console.log('ingreso tiene datafiles y files')
//             await data?.dataFiles?.forEach(element => {
//                 infoFile.push({
//                     filename: element.filename,
//                     path:element.path as string,
//                     pathView: `${process.cwd()}/storage/${element.filename}`,
//                     size: element.size,
//                     mimetype:  element.mimetype
//                 });
//             });
//             await data?.files?.forEach(element => {
//                 infoFile.push({
//                     filename: element.filename,
//                     path:element.path as string,
//                     pathView: `${process.cwd()}/storage/${element.filename}`,
//                     size: element.size,
//                     mimetype:  element.mimetype
//                 });
//             });
//             console.log('infoFiles', infoFile)
//             // infoFile.push(data?.files as any);
//             dataEgress.files = infoFile
//             // console.log('infoFiles dataEgress', dataEgress)
//         } else if(Object.keys(data?.files as any).length > 0){
//             // infoFile = data?.files as any;
//             console.log('ingreso tiene files')
//             dataEgress.files = data.files;
//         } else if(Object.keys(data?.dataFiles as any).length > 0){
//             await data?.dataFiles?.forEach(element => {
//                 infoFile.push({
//                     filename: element.filename,
//                     path:element.path as string,
//                     pathView: `${process.cwd()}/storage/${element.filename}`,
//                     size: element.size,
//                     mimetype:  element.mimetype
//                 });
//             });
//             dataEgress.files = infoFile
//         }
//         console.log("dataEgress", dataEgress)
//         const responseInsertE = await EgressModel.findOneAndUpdate(
//             {_id: data?.egress?._id },
//             dataEgress,
//             { new: true }
//         );
//         console.log('resultado egresos', responseInsertE)
//         const deleteI = await paymentTypeHasEgressModel.deleteMany({egress: data?.egress?._id});
//         if (Object.keys(data.egress?.paymentHasEgress as any).length > 0 ) {
//             let dataPayment: any = [];
//             await data.egress?.paymentHasEgress?.forEach(
//                 (item: any) => {
//                 const dataPaymentTypeHasEgress: paymentTypeHasEgress = {
//                     payments: item.payments,
//                     egress: data?.egress?._id as string,
//                     paymentAmount: item.paymentAmount,
//                 }
//                 dataPayment.push(dataPaymentTypeHasEgress)
//             });
//             const resultType = await paymentTypeHasEgressModel.insertMany(dataPayment);
//             console.log('resulttype ingreso', resultType)
//         }
//         return dataEgress; 
//     } else {
//         console.log(' n consigio egreso')
//     }
// }
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
