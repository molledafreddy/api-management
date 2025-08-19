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
exports.validOrderProvider = exports.insertOrUpdateOrder = exports.searchEgress = exports.getOrderDetail = exports.searchOrderPaitOut = exports.getOrder = exports.getOrders = void 0;
const order_1 = __importDefault(require("../models/order"));
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
const searchEgress = (egress) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const ObjectId = mongoose_1.default.Types.ObjectId;
    // return  order;
    // console.log('date', egress)
    let filter = {};
    const _id = egress._idOrder || null;
    // console.log('order id')
    // return order;
    const orders = egress.orders || '';
    const operationBills = egress.operationBills || '';
    const invoiceNumber = egress.invoiceNumber || '';
    const page = parseInt(egress.page, 10) || 1;
    const limit = parseInt(egress.limit, 10) || 10;
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
        // console.log('llelsad', order?.estimateReceptionDate?.firstDate)
        const myArray = (_g = egress === null || egress === void 0 ? void 0 : egress.paymentDate) === null || _g === void 0 ? void 0 : _g.firstDate.split("/");
        const myArray2 = (_h = egress === null || egress === void 0 ? void 0 : egress.paymentDate) === null || _h === void 0 ? void 0 : _h.endDate.split("/");
        //     console.log('egress?.paymentDate?.startDate',myArray)
        // console.log('egress?.paymentDate?.endDate', myArray2)
        filter.paymentDate = {
            $gte: new Date(myArray[2], myArray[0] - 1, myArray[1], 0, 0, 0),
            $lt: new Date(myArray2[2], myArray2[0] - 1, myArray2[1], 23, 59, 999)
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
        filter.paymentDate = {
            $gte: dateStr, $lt: nextDate
        };
    }
    // return filter;
    // console.log('filter', filter)
    try {
        let responseSum = [];
        responseSum = yield egress_1.default.aggregate([
            { $match: filter },
            { $group: { _id: null, sum: { $sum: "$amount" } } }
        ]);
        const responseItem = yield egress_1.default.aggregate([
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
            { $skip: (page - 1) * limit || 0 },
            { $limit: Number(limit) },
        ]);
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
        return response;
    }
    catch (e) {
        console.log(e);
    }
});
exports.searchEgress = searchEgress;
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
    // // return [order.egress.paymentHasEgress as undefined];
    // // permite validar que el proveedor exista en la base de datos
    // // const resultGet =  getOrders();
    // // const resultGet = getOrder(order.id as string);
    // // return  resultGet;
    // let resultProvider: any = [];
    // resultProvider = await getProvider(order.providers as string);
    // // return resultProvider;
    // if ( Object.keys(resultProvider).length == 0) {
    //     return "PROVEEDOR_NOT_FOUND";
    // }
    // // return [order];
    // if (order.status != "paid_out" 
    //     && order.estimatedAmount as number  <= 0) {
    //     return "NOT_FOUND_ESTIMATED_AMOUNT";
    // }
    // // console.log('orderorderorder', order)
    // // return [order];
    // // return "paso la validacion";
    // // if (order.status != "paid_out" 
    // //     && order.egress != undefined 
    // //     && Object.entries(order?.egress as any).length > 0) {
    // //     return "INFORMATION_EGREES_WITH_DATA";
    // // }
    // if (order.status === "paid_out") {
    //     const value = validPaidOrder(order);
    //     if (value != "VALID_SUCCESS") {
    //         return value;
    //     }
    // }
    // // return [order];
    // // return 'pas la validacion';
    // //permite validar si existe una joranada de trabajo para relacionar a la orden
    // let resulData: any = [];
    // const resultDate = await getWorkingForDate();
    // // return [resultDate];
    // if ( Object.keys(resultDate).length == 0) {
    //     resulData = await insertWorkingDay();
    // } else {
    //     resulData = resultDate[0];
    // }
    // // return resulData._id;
    // // return [order.id];
    // let dataFiles: any = [];
    // // console.log('archivos', operation.files)
    // if (Object.keys(order.files as any).length > 0) {
    //     console.log('ingreso tiene archivos');
    //         order.files?.forEach(element => {
    //         // console.log('element',element)
    //         dataFiles.push({
    //             path:element.path as string,
    //             pathView: `${process.cwd()}/storage/${element.filename}`,
    //             filename: element.filename,
    //             size: element.size,
    //             mimetype:  element.mimetype
    //         })
    //     });
    //     order.files = dataFiles
    // }
    // // return order.files;
    // if (order._id) {
    //     // return "ingreso al if realizara la actualizacion";
    //     console.log('ciene con data')
    //     // return ["actualizacion",resulData._id, order._id];
    //     const resultUpdate = await updateOrder(order._id as string,resulData._id, order)
    //     return resultUpdate;
    // } else {
    //     // return "ingreso al else";
    //     // return order;
    //     // console.log('vieen vacio')
    //     // return ["vieen vacio", resulData._id];
    //     const resultData = await insertOrder(resulData._id, order)
    //     return resultData;
    // }
    // return order;
});
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
const getEgress = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield egress_1.default.find({
        orders: orderId
    });
    console.log('consulta de egresos', resp);
    return resp;
});
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
const validOrderProvider = (provider) => __awaiter(void 0, void 0, void 0, function* () {
    const responseTurn = yield order_1.default.find({
        $or: [{ status: { $gt: "requested" } }, { status: { $gt: "no_received" } }],
        providers: provider
    });
    return responseTurn;
});
exports.validOrderProvider = validOrderProvider;
//# sourceMappingURL=egress.js.map