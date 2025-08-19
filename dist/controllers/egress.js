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
exports.consultStatusOrder = exports.postOrder = exports.searchEgress = exports.searchOrderPaitOut = exports.getOrderDetail = exports.getOrder = exports.getOrders = void 0;
const egress_1 = require("../services/egress");
const error_handle_1 = require("../utils/error.handle");
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('llego por aca');
        const response = yield (0, egress_1.getOrders)();
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_ORDERS");
    }
});
exports.getOrders = getOrders;
const getOrder = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params }, res) {
    try {
        const { id } = params;
        const responseItem = yield (0, egress_1.getOrder)(id);
        res.send(responseItem);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_ORDERS");
    }
});
exports.getOrder = getOrder;
const getOrderDetail = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params }, res) {
    try {
        console.log('llego al getOrderDetail');
        const { id } = params;
        const responseItem = yield (0, egress_1.getOrderDetail)(id);
        res.send(responseItem);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_ORDERS");
    }
});
exports.getOrderDetail = getOrderDetail;
const searchOrderPaitOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('llego al searchDetail',body.date[0].estimateReceptionDate)
        // const {id} = params;
        const query = req.query;
        // console.log('searchOrderPaitOut', query)
        // res.send(query);
        const responseItem = yield (0, egress_1.searchOrderPaitOut)(query);
        // console.log('responseItem', responseItem)
        res.send(responseItem);
    }
    catch (e) {
        console.log('e', e);
        (0, error_handle_1.handleHttp)(res, "ERROR_GET__SEARCH_ORDERS");
    }
});
exports.searchOrderPaitOut = searchOrderPaitOut;
const searchEgress = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ body }, res) {
    try {
        console.log('llego al searchDetail', body);
        // const {id} = params;
        // res.send(body);
        const responseItem = yield (0, egress_1.searchEgress)(body);
        // console.log('responseItem', responseItem)
        res.send(responseItem);
    }
    catch (e) {
        console.log('e', e);
        (0, error_handle_1.handleHttp)(res, "ERROR_GET__SEARCH_ORDERS");
    }
});
exports.searchEgress = searchEgress;
const consultStatusOrder = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params }, res) {
    try {
        const { id } = params;
        const responseItem = yield (0, egress_1.validOrderProvider)(id);
        res.send(responseItem);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_ORDERS");
    }
});
exports.consultStatusOrder = consultStatusOrder;
const postOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    //   const { user, body, files } = req;
    //     body.users = `${user?._id}`;
    //     var valueOrder = JSON.parse(req.body.data)
    //     // console.log('valueOrder', valueOrder)
    //     let paymentHasEgress = [];
    //     if (req.body.paymentHasEgress !== undefined) {
    //       paymentHasEgress = JSON.parse(req.body.paymentHasEgress);
    //     }
    //     let dataFiles = [];
    //     if (req.body.dataFiles !== undefined) {
    //       dataFiles = JSON.parse(req.body.dataFiles);
    //     }
    //     let formatAmount = 0;
    //     // console.log('valueOrder.amount', valueOrder)
    //     if (valueOrder?.amount !== null && valueOrder?.amount !== undefined) {
    //       var monto = "$ 178.000";
    //       formatAmount = valueOrder?.amount.replace(/[$.]/g,'');
    //     }
    //     // console.log('formatAmount',formatAmount)
    //       // return valueOrder;
    //     const egress: Egress = {
    //       _id: valueOrder?._idEgress,
    //       // _id: "",
    //       invoiceNumber: valueOrder?.invoiceNumber,
    //       amount:formatAmount,
    //       description: valueOrder?.descriptionPayment,
    //       paymentHasEgress: paymentHasEgress as any
    //     }
    //     // console.log('datos egress', egress)
    //     const requestO: RequestOrder = {
    //       _id: valueOrder?._id,
    //       paymentDate: valueOrder?.paymentDate,
    //       receptionDate: valueOrder?.receptionDate,
    //       EstimateReceptionDate: valueOrder?.estimateReceptionDate,
    //       creditPaymentDate: valueOrder?.creditPaymentDate,
    //       amountPaid: formatAmount,
    //       invoiceNumber: valueOrder?.invoiceNumber,
    //       orderDate: valueOrder?.orderDate,
    //       descriptionOrder: valueOrder?.descriptionOrder,
    //       descriptionPayment: valueOrder?.descriptionPayment,
    //       descriptionLogistic: valueOrder?.descriptionLogistic,
    //       status: valueOrder?.status,
    //       estimatedAmount: valueOrder?.estimatedAmount,
    //       providers: valueOrder?.providers,
    //       paymentMethod: valueOrder?.paymentMethod,
    //       files: files as any,
    //       dataFiles: dataFiles as any,
    //       egress: egress,
    //       users: user,
    //     }
    //     // console.log('requestO', requestO)
    //     // res.send(body);
    //     // return {body};
    //     // res.send(requestO);
    //     const  responseOrder = await insertOrUpdateOrder(requestO);
    //     res.send(responseOrder);
    // } catch (e) {
    //     handleHttp(res, "ERROR_POST_ORDERS", e)
    // }
});
exports.postOrder = postOrder;
//# sourceMappingURL=egress.js.map