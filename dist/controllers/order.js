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
exports.consultStatusOrder = exports.postOrder = exports.searchOrderDetail = exports.searchOrderPaitOut = exports.getOrderDetail = exports.getOrder = exports.getOrders = void 0;
const order_1 = require("../services/order");
const error_handle_1 = require("../utils/error.handle");
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('llego por aca');
        const response = yield (0, order_1.getOrders)();
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
        const responseItem = yield (0, order_1.getOrder)(id);
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
        const responseItem = yield (0, order_1.getOrderDetail)(id);
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
        const responseItem = yield (0, order_1.searchOrderPaitOut)(query);
        // console.log('responseItem', responseItem)
        res.send(responseItem);
    }
    catch (e) {
        console.log('e', e);
        (0, error_handle_1.handleHttp)(res, "ERROR_GET__SEARCH_ORDERS");
    }
});
exports.searchOrderPaitOut = searchOrderPaitOut;
const searchOrderDetail = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ body }, res) {
    try {
        // console.log('llego al searchDetail',body.date[0].estimateReceptionDate)
        // const {id} = params;
        const responseItem = yield (0, order_1.searchOrderDetail)(body);
        // console.log('responseItem', responseItem)
        res.send(responseItem);
    }
    catch (e) {
        console.log('e', e);
        (0, error_handle_1.handleHttp)(res, "ERROR_GET__SEARCH_ORDERS");
    }
});
exports.searchOrderDetail = searchOrderDetail;
const consultStatusOrder = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params }, res) {
    try {
        const { id } = params;
        const responseItem = yield (0, order_1.validOrderProvider)(id);
        res.send(responseItem);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_ORDERS");
    }
});
exports.consultStatusOrder = consultStatusOrder;
const postOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, body, files } = req;
        body.users = `${user === null || user === void 0 ? void 0 : user._id}`;
        var valueOrder = JSON.parse(req.body.data);
        // console.log('fireq.body.paymentHasEgressles', req.body.paymentHasEgress)
        // res.send(req.body);
        let paymentHasEgress = [];
        if (req.body.paymentHasEgress !== undefined) {
            paymentHasEgress = JSON.parse(req.body.paymentHasEgress);
        }
        // console.log('paymentHasEgress', paymentHasEgress)
        // res.send(req.body);
        let dataFiles = [];
        if (req.body.dataFiles !== undefined) {
            dataFiles = JSON.parse(req.body.dataFiles);
        }
        let formatEstimatedAmount = 0;
        // console.log('valueOrder.amount', valueOrder)
        // res.send(valueOrder);
        if ((valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.estimatedAmount) !== null && (valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.estimatedAmount) !== undefined) {
            formatEstimatedAmount = valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.estimatedAmount.toString().replace(/[$,]/g, '');
        }
        // console.log('formatAmount',formatEstimatedAmount)
        // return valueOrder;
        const egress = {
            _id: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder._idEgress,
            paymentDate: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.paymentDate,
            invoiceNumber: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.invoiceNumber,
            amount: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.amount,
            description: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.descriptionPayment,
            paymentHasEgress: paymentHasEgress,
            type: 'orders',
        };
        // console.log('datos egress', egress)
        const requestO = {
            _id: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder._id,
            paymentDate: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.paymentDate,
            receptionDate: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.receptionDate,
            EstimateReceptionDate: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.estimateReceptionDate,
            creditPaymentDate: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.creditPaymentDate,
            amountPaid: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.amount,
            invoiceNumber: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.invoiceNumber,
            orderDate: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.orderDate,
            descriptionOrder: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.descriptionOrder,
            descriptionPayment: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.descriptionPayment,
            descriptionLogistic: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.descriptionLogistic,
            status: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.status,
            estimatedAmount: formatEstimatedAmount,
            providers: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.providers,
            paymentMethod: valueOrder === null || valueOrder === void 0 ? void 0 : valueOrder.paymentMethod,
            files: files,
            dataFiles: dataFiles,
            egress: egress,
            users: user,
            type: 'orders',
        };
        // console.log('requestO', requestO)
        // res.send(body);
        // return {body};
        // res.send(egress);
        const responseOrder = yield (0, order_1.insertOrUpdateOrder)(requestO);
        res.send(responseOrder);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_POST_ORDERS", e);
    }
});
exports.postOrder = postOrder;
//# sourceMappingURL=order.js.map