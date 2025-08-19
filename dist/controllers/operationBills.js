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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOperationBills = exports.updateOperationBills = exports.postOperationBills = exports.getOperationBill = exports.getPaymentHasEgress = exports.getOperationBills = void 0;
const operationBill_1 = require("../services/operationBill");
const error_handle_1 = require("../utils/error.handle");
const getOperationBills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const response = yield (0, operationBill_1.getOperationBills)(query);
        res.send(response);
    }
    catch (e) {
        console.log('error', e);
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_OPERATIONBILLS");
    }
});
exports.getOperationBills = getOperationBills;
const getOperationBill = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params }, res) {
    try {
        const { id } = params;
        const responseItem = yield (0, operationBill_1.getOperationBill)(id);
        res.send(responseItem);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_OPERATIONBILLS");
    }
});
exports.getOperationBill = getOperationBill;
const getPaymentHasEgress = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params }, res) {
    try {
        const { id } = params;
        const responseItem = yield (0, operationBill_1.getPaymentHasEgress)(id);
        res.send(responseItem);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_PAYMENTHASEGRESS", e);
    }
});
exports.getPaymentHasEgress = getPaymentHasEgress;
// const searchOrderDetail = async ({body}: RequestExt, res: Response) => {
//   try {
//     console.log('llego al searchDetail')
//         // const {id} = params;
//         const  responseItem = await searchDetail(body);
//         console.log('responseItem', responseItem)
//         res.send(responseItem);
//   } catch (e) {
//     handleHttp(res, "ERROR_GET_ORDERS");
//   }
// };
const postOperationBills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('req', req);
        const { user, body, files } = req;
        body.users = `${user === null || user === void 0 ? void 0 : user._id}`;
        var valueOperation = JSON.parse(req.body.data);
        // res.send(body);
        // console.log('req.body', req.body.dataFiles)
        if (req.body.paymentHasEgress !== undefined) {
            var paymentHasEgress = JSON.parse(req.body.paymentHasEgress);
        }
        if (req.body.dataFiles !== undefined) {
            var dataFiles = JSON.parse(req.body.dataFiles);
        }
        // console.log('files', files);
        let now = new Date();
        const formatoMap = {
            dd: now.getDate(),
            mm: now.getMonth() + 1,
            yy: now.getFullYear().toString().slice(-2),
            yyyy: now.getFullYear()
        };
        let formatAmount = 0;
        if ((valueOperation === null || valueOperation === void 0 ? void 0 : valueOperation.amount) !== null && (valueOperation === null || valueOperation === void 0 ? void 0 : valueOperation.amount) !== undefined) {
            formatAmount = valueOperation === null || valueOperation === void 0 ? void 0 : valueOperation.amount.toString().replace(/[$.,]/g, '');
        }
        const egress = {
            _id: valueOperation._idEgress,
            invoiceNumber: valueOperation.invoiceNumber,
            amount: formatAmount,
            description: valueOperation.description,
            paymentHasEgress: paymentHasEgress,
            type: 'operationBills',
            paymentDate: new Date(formatoMap.yyyy, formatoMap.mm - 1, formatoMap.dd, 12, 0, 0)
        };
        const reqOperation = {
            id: body === null || body === void 0 ? void 0 : body.id,
            description: valueOperation.description,
            amount: formatAmount,
            egress: egress,
            users: user === null || user === void 0 ? void 0 : user._id,
            type: valueOperation.type,
            files: files,
            dataFiles: dataFiles,
        };
        // res.send(reqOperation);
        if (!valueOperation._id) {
            // console.log('llego al post')
            const responseOrder = yield (0, operationBill_1.insertOperationBills)(reqOperation);
            res.send(responseOrder);
        }
        else {
            console.log('llego al update');
            const response = yield (0, operationBill_1.updateOperationBills)(valueOperation._id, reqOperation);
            res.send(response);
        }
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_POST_OPERATIONBILLS", e);
    }
});
exports.postOperationBills = postOperationBills;
const updateOperationBills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, body, params, files } = req;
        console.log('llego por aca body', req.body);
        const { id } = params;
        const response = yield (0, operationBill_1.updateOperationBills)(id, body);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_UPDATE_OPERATIONBILLS");
    }
});
exports.updateOperationBills = updateOperationBills;
const deleteOperationBills = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params }, res) {
    try {
        const { id } = params;
        const response = yield (0, operationBill_1.deleteOperationBills)(id);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_DELETE_OPERATIONBILLS");
    }
});
exports.deleteOperationBills = deleteOperationBills;
//# sourceMappingURL=operationBills.js.map