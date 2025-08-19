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
exports.deleteOperationBills = exports.updateOperationBills = exports.getOperationBill = exports.getOperationBills = exports.getPaymentHasEgress = exports.insertOperationBills = void 0;
const operationBill_1 = __importDefault(require("../models/operationBill"));
const egress_1 = __importDefault(require("../models/egress"));
const paymentTypeHasEgress_1 = __importDefault(require("../models/paymentTypeHasEgress"));
const mongoose_1 = __importDefault(require("mongoose"));
const paymentType_1 = require("./paymentType");
const insertOperationBills = (operation) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // return operation; 
    const value = validPaidOperation(operation);
    if (value != "VALID_SUCCESS") {
        return value;
    }
    let dataFiles = [];
    // console.log('archivos', operation.files)
    if (Object.keys(operation.files).length > 0) {
        (_a = operation.files) === null || _a === void 0 ? void 0 : _a.forEach(element => {
            // console.log('element',element)
            dataFiles.push({
                path: element.path,
                pathView: `${process.cwd()}/storage/${element.filename}`,
                filename: element.filename,
                size: element.size,
                mimetype: element.mimetype
            });
        });
        operation.files = dataFiles;
    }
    const responseInsert = yield operationBill_1.default.create(operation);
    // console.log('dresponseInsert', responseInsert)
    // return responseInsert;
    if (responseInsert._id != undefined) {
        const resultEgress = createEgress(responseInsert._id, operation);
        // return resultEgress;
    }
    console.log('responseInsert operation bills', responseInsert);
    return responseInsert;
});
exports.insertOperationBills = insertOperationBills;
const validPaidOperation = (operation) => {
    if ((operation === null || operation === void 0 ? void 0 : operation.amount) <= 0) {
        return "NOT_FOUND_AMOUNT";
    }
    if (operation.egress == undefined || Object.entries(operation.egress).length == 0) {
        return "NOT_FOUND_DATA_EGRESS";
    }
    if (operation.egress.paymentHasEgress == undefined || Object.entries(operation.egress.paymentHasEgress).length == 0) {
        return "NOT_FOUND_DATA_PAYMENT_HAS_EGRESS";
    }
    let valueAmount = 0;
    valueAmount = operation.egress.paymentHasEgress.filter(d => parseInt(d.paymentAmount)).map(d => parseInt(d.paymentAmount)).reduce((a, b) => a + b, 0);
    if (valueAmount != operation.amount) {
        return "AMOUNT_DISTINC_SUM_PAYMENT_EGRESS";
    }
    return "VALID_SUCCESS";
};
const createEgress = (operationId, data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const validEgress = yield getEgress(operationId);
    // console.log('validEgress', validEgress)
    if (Object.keys(validEgress).length == 0) {
        console.log("ingreso se creara un abono");
        console.log("ingreso se creara un abono");
        console.log("ingreso se creara un abono");
        console.log("ingreso se creara un abono", data === null || data === void 0 ? void 0 : data.files);
        const dataEgress = {
            invoiceNumber: (_a = data.egress) === null || _a === void 0 ? void 0 : _a.invoiceNumber,
            operationBills: operationId,
            description: data === null || data === void 0 ? void 0 : data.description,
            amount: data === null || data === void 0 ? void 0 : data.amount,
            files: data === null || data === void 0 ? void 0 : data.files,
            type: 'operationBills',
            paymentDate: (_b = data.egress) === null || _b === void 0 ? void 0 : _b.paymentDate
        };
        const responseInsertE = yield egress_1.default.create(dataEgress);
        // return responseInsertE;
        if ((responseInsertE === null || responseInsertE === void 0 ? void 0 : responseInsertE._id) != undefined && Object.keys((_c = data.egress) === null || _c === void 0 ? void 0 : _c.paymentHasEgress).length > 0) {
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
            // let dataPayment: any = [];
            // await data.egress?.paymentHasEgress?.forEach(
            //     (item: any) => {
            //     const dataPaymentTypeHasEgress: paymentTypeHasEgress = {
            //         payments: item.payments,
            //         egress: responseInsertE._id as string,
            //         paymentAmount: item.paymentAmount,
            //     }
            //     dataPayment.push(dataPaymentTypeHasEgress)
            // });
            // const resulttype = await paymentTypeHasEgressModel.insertMany(dataPayment);
            // console.log('resulttype', resulttype)
        }
        return dataEgress;
    }
});
const updateEgress = (operationId, data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    console.log('valor', data);
    // return data;
    const validEgress = yield getEgress(operationId);
    // console.log('validEgress', validEgress)
    if (Object.keys(validEgress).length == 0) {
        // console.log("ingreso se creara un abono")
        // console.log("ingreso se creara un abono")
        console.log("ingreso se creara un abono data?.dataFiles", data === null || data === void 0 ? void 0 : data.dataFiles);
        console.log("ingreso se creara un abono data?.files", data === null || data === void 0 ? void 0 : data.files);
        const dataEgress = {
            invoiceNumber: (_a = data.egress) === null || _a === void 0 ? void 0 : _a.invoiceNumber,
            operationBills: operationId,
            description: data === null || data === void 0 ? void 0 : data.description,
            amount: data === null || data === void 0 ? void 0 : data.amount,
            type: 'operationBills',
        };
        let infoFile = [];
        if (Object.keys(data === null || data === void 0 ? void 0 : data.dataFiles).length > 0 && Object.keys(data === null || data === void 0 ? void 0 : data.files).length > 0) {
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
        const deleteI = yield paymentTypeHasEgress_1.default.deleteMany({ egress: (_f = data === null || data === void 0 ? void 0 : data.egress) === null || _f === void 0 ? void 0 : _f._id });
        // return deleteI;
        // const responseInsertE = await EgressModel.create(dataEgress);
        // return responseInsertE;
        if (Object.keys((_g = data.egress) === null || _g === void 0 ? void 0 : _g.paymentHasEgress).length > 0) {
            const resultPayments = yield (0, paymentType_1.getPaymentTypes)();
            if (Object.keys(resultPayments).length > 0) {
                let dataPayment = [];
                yield ((_j = (_h = data.egress) === null || _h === void 0 ? void 0 : _h.paymentHasEgress) === null || _j === void 0 ? void 0 : _j.forEach((item) => {
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
            // let dataPayment: any = [];
            // await data.egress?.paymentHasEgress?.forEach(
            //     (item: any) => {
            //     const dataPaymentTypeHasEgress: paymentTypeHasEgress = {
            //         payments: item.payments,
            //         egress: data?.egress?._id as string,
            //         paymentAmount: item.paymentAmount,
            //     }
            //     dataPayment.push(dataPaymentTypeHasEgress)
            // });
            // const resulttype = await paymentTypeHasEgressModel.insertMany(dataPayment);
            // console.log('resulttype', resulttype)
        }
        // return dataEgress; 
    }
});
const getEgress = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield egress_1.default.find({
        orders: orderId
    });
    return resp;
});
const getOperationBills = (query) => __awaiter(void 0, void 0, void 0, function* () {
    let valid = {};
    const search = query.search || null;
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const startDate = query.startDate || '';
    const endDate = query.endDate || '';
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
    if (search != null) {
        valid = {
            $text: {
                $search: `\"${search}\" authority key`
            },
        };
    }
    if ((startDate !== '' && endDate !== '')) {
        const dataStartDate = startDate.split("/");
        const dataEndDate = endDate.split("/");
        var dateStr = new Date(dataStartDate[2], dataStartDate[0] - 1, dataStartDate[1], 0, 0, 0, 0);
        var nextDate = new Date(dataEndDate[2], dataEndDate[0] - 1, dataEndDate[1], 23, 59, 59, 999);
        valid.createdAt = {
            $gte: dateStr, $lt: nextDate
        };
    }
    const responseItem = yield operationBill_1.default.aggregate([
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
    ]);
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
    return response;
});
exports.getOperationBills = getOperationBills;
const getPaymentHasEgress = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield paymentTypeHasEgress_1.default.find({ egress: id })
        .populate('payments');
    return responseItem;
});
exports.getPaymentHasEgress = getPaymentHasEgress;
const getOperationBill = (id) => __awaiter(void 0, void 0, void 0, function* () {
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
        // valid = {$eq: {_id:new mongoose.Types.ObjectId("63f7ebee0e2be4525a156238")}};
        const ObjectId = mongoose_1.default.Types.ObjectId;
        // 63ec10592073ceeccba8bf9e
        valid = { _id: new ObjectId(id) };
        // valid = {"_id":{$eq:new ObjectId("63f7ebee0e2be4525a156238")}}
        // valid = {type: 'cleaning_products'};
        console.log('llego por aca', valid);
        // await new mongoose.Types.ObjectId('6358403b25b29d9b3d42846c')
        const responseItem = yield operationBill_1.default.aggregate([
            { $match: valid },
            // {$match: { _id: new ObjectId("63f7ebee0e2be4525a156238") }},
            { $lookup: { from: 'egresses', localField: '_id', foreignField: 'operationBills', as: 'egress' } },
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
exports.getOperationBill = getOperationBill;
const updateOperationBills = (id, operation) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const value = validPaidOperation(operation);
    if (value != "VALID_SUCCESS") {
        return value;
    }
    // return operation;
    let dataFiles = [];
    if (Object.keys(operation.files).length > 0) {
        (_a = operation.files) === null || _a === void 0 ? void 0 : _a.forEach(element => {
            // console.log('element',element)
            dataFiles.push({
                path: element.path,
                pathView: `${process.cwd()}/storage/${element.filename}`,
                filename: element.filename,
                size: element.size,
                mimetype: element.mimetype
            });
        });
        operation.files = dataFiles;
    }
    // return operation.dataFiles;
    // return operation.files;
    // console.log('dataFiles', dataFiles)
    // return operation;
    // return operation;
    // const responseInsert = await OperationBillSchemaModel.create(operation);
    const responseInsert = yield operationBill_1.default.findOneAndUpdate({ _id: id }, operation, { new: true });
    // console.log('actualizacion')
    // return responseInsert;
    // console.log('dresponseInsert', responseInsert)
    // return responseInsert;
    // if (responseInsert._id != undefined) {
    const resultEgress = yield updateEgress(id, operation);
    return resultEgress;
    // }
    return responseInsert;
});
exports.updateOperationBills = updateOperationBills;
const deleteOperationBills = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield operationBill_1.default.remove({ _id: id });
    return responseItem;
});
exports.deleteOperationBills = deleteOperationBills;
//# sourceMappingURL=operationBill.js.map