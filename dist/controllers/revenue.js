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
exports.postRevenueOther = exports.getRevenueOther = exports.getRevenueTurn = exports.postRevenueWorkingDay = exports.getRevenue = exports.getRevenues = void 0;
const revenue_1 = require("../services/revenue");
const error_handle_1 = require("../utils/error.handle");
const getRevenues = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('llego por aca');
        const query = req.query;
        const response = yield (0, revenue_1.getRevenues)();
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_REVENUES");
    }
});
exports.getRevenues = getRevenues;
const getRevenue = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params }, res) {
    try {
        const { id } = params;
        // console.log('parametros getRevenue');
        const responseItem = yield (0, revenue_1.getRevenue)(id);
        // console.log('getRevenue', responseItem)
        res.send(responseItem);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_REVENUE");
    }
});
exports.getRevenue = getRevenue;
const getRevenueTurn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('reqssss getRevenueTurn', req)
        const { user, body, query } = req;
        // const query = req.query;
        query.users = `${user === null || user === void 0 ? void 0 : user._id}`;
        // return body;
        // console.log('query', query)
        // res.send(query);
        const responseItem = yield (0, revenue_1.getRevenueTurn)(query);
        res.send(responseItem);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_REVENUEsss", e);
    }
});
exports.getRevenueTurn = getRevenueTurn;
const getRevenueOther = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('reqssss getRevenueTurn', req)
        const { user, body, query } = req;
        // const query = req.query;
        query.users = `${user === null || user === void 0 ? void 0 : user._id}`;
        // return body;
        // console.log('query', query)
        // res.send(query);
        const responseItem = yield (0, revenue_1.getRevenueOther)(query);
        res.send(responseItem);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_REVENUEsss", e);
    }
});
exports.getRevenueOther = getRevenueOther;
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
const postRevenueWorkingDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, body, files } = req;
        // res.send(req.body);
        var valueRevenue = JSON.parse(req.body.data.toString());
        valueRevenue.users = user === null || user === void 0 ? void 0 : user._id;
        // var detailRevenue = JSON.parse(req.body.detailRevenue.toString());
        let dataFiles = [];
        if (req.body.dataFiles !== undefined) {
            dataFiles = JSON.parse(req.body.dataFiles);
        }
        let formattotalAmount = 0;
        console.log('valueOrder.amount', valueRevenue);
        // console.log('valueRevenue?.totalAmount', valueRevenue?.totalAmount)
        // res.send(valueRevenue);
        if ((valueRevenue === null || valueRevenue === void 0 ? void 0 : valueRevenue.totalAmount) !== null && (valueRevenue === null || valueRevenue === void 0 ? void 0 : valueRevenue.totalAmount) !== undefined) {
            valueRevenue.totalAmount = Number(valueRevenue === null || valueRevenue === void 0 ? void 0 : valueRevenue.totalAmount.toString().replace(/[$,]/g, ''));
        }
        // valueRevenue
        // const revenue: Revenue = {
        //   amountTransfer?: number;
        //   amountPos?: number;
        //   amountCash?: number;
        //   amountOther?: number;
        //   amountSistem?: number;
        //   description?: String;
        //   turn?: String;
        //   cashFund?: number;
        //   amountTurn: number;
        //   totalAmount: number;
        //   users?: string;
        //   workingDay?: string;
        //   files?: any;
        //   type: 'other' | 'closing';
        // }
        valueRevenue.type = 'closure';
        const reqRevenue = {
            id: valueRevenue._id,
            // detailRevenue:detailRevenue,
            revenue: valueRevenue,
            users: user === null || user === void 0 ? void 0 : user._id,
            dataFiles: dataFiles,
            files: files,
            type: valueRevenue.type
        };
        // res.send(reqRevenue);
        const responseOrder = yield (0, revenue_1.insertOrUpdateRevenueWorkingDay)(reqRevenue);
        res.send(responseOrder);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_POST_POSTREVENUEWORKINGDAY", e);
    }
});
exports.postRevenueWorkingDay = postRevenueWorkingDay;
const postRevenueOther = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('llegoi por aca');
        const { user, body, files } = req;
        var valueRevenue = JSON.parse(req.body.data.toString());
        valueRevenue.users = user === null || user === void 0 ? void 0 : user._id;
        // res.send(body);
        // var detailRevenue = JSON.parse(req.body.detailRevenue.toString());
        if ((valueRevenue === null || valueRevenue === void 0 ? void 0 : valueRevenue.totalAmount) !== null && (valueRevenue === null || valueRevenue === void 0 ? void 0 : valueRevenue.totalAmount) !== undefined) {
            valueRevenue.totalAmount = Number(valueRevenue === null || valueRevenue === void 0 ? void 0 : valueRevenue.totalAmount.toString().replace(/[$,]/g, ''));
        }
        let dataFiles = [];
        if (req.body.dataFiles !== undefined) {
            dataFiles = JSON.parse(req.body.dataFiles);
        }
        const reqRevenue = {
            id: valueRevenue._id,
            // detailRevenue:detailRevenue,
            revenue: valueRevenue,
            users: user === null || user === void 0 ? void 0 : user._id,
            dataFiles: dataFiles,
            files: files,
            type: 'other'
        };
        const responseOrder = yield (0, revenue_1.insertOrUpdateRevenueOther)(reqRevenue);
        res.send(responseOrder);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_POST_POSTREVENUEOTHER", e);
    }
});
exports.postRevenueOther = postRevenueOther;
//# sourceMappingURL=revenue.js.map