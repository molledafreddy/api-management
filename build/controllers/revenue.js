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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRevenueOther = exports.getRevenueOther = exports.getRevenueTurn = exports.postRevenueWorkingDay = exports.getRevenue = exports.getRevenues = void 0;
var revenue_1 = require("../services/revenue");
var error_handle_1 = require("../utils/error.handle");
var getRevenues = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, response, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                query = req.query;
                return [4 /*yield*/, (0, revenue_1.getRevenues)()];
            case 1:
                response = _a.sent();
                res.send(response);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                (0, error_handle_1.handleHttp)(res, "ERROR_GET_REVENUES");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getRevenues = getRevenues;
var getRevenue = function (_a, res) {
    var params = _a.params;
    return __awaiter(void 0, void 0, void 0, function () {
        var id, responseItem, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    id = params.id;
                    return [4 /*yield*/, (0, revenue_1.getRevenue)(id)];
                case 1:
                    responseItem = _b.sent();
                    // console.log('getRevenue', responseItem)
                    res.send(responseItem);
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _b.sent();
                    (0, error_handle_1.handleHttp)(res, "ERROR_GET_REVENUE");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getRevenue = getRevenue;
var getRevenueTurn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, body, query, responseItem, e_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                console.log('reqssss getRevenueTurn', (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.role);
                user = req.user, body = req.body, query = req.query;
                // const query = req.query;
                query.users = "".concat(user === null || user === void 0 ? void 0 : user._id);
                query.role = "".concat(user === null || user === void 0 ? void 0 : user.role);
                return [4 /*yield*/, (0, revenue_1.getRevenueTurn)(query)];
            case 1:
                responseItem = _b.sent();
                res.send(responseItem);
                return [3 /*break*/, 3];
            case 2:
                e_3 = _b.sent();
                (0, error_handle_1.handleHttp)(res, "ERROR_GET_REVENUEsss", e_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getRevenueTurn = getRevenueTurn;
var getRevenueOther = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, body, query, responseItem, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.user, body = req.body, query = req.query;
                // const query = req.query;
                query.users = "".concat(user === null || user === void 0 ? void 0 : user._id);
                return [4 /*yield*/, (0, revenue_1.getRevenueOther)(query)];
            case 1:
                responseItem = _a.sent();
                res.send(responseItem);
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                (0, error_handle_1.handleHttp)(res, "ERROR_GET_REVENUEsss", e_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
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
var postRevenueWorkingDay = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, body, files, valueRevenue, dataFiles, formattotalAmount, reqRevenue, responseOrder, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.user, body = req.body, files = req.files;
                valueRevenue = JSON.parse(req.body.data.toString());
                valueRevenue.users = user === null || user === void 0 ? void 0 : user._id;
                dataFiles = [];
                if (req.body.dataFiles !== undefined) {
                    dataFiles = JSON.parse(req.body.dataFiles);
                }
                formattotalAmount = 0;
                console.log('valueOrder.amount', valueRevenue.datos);
                console.log('valueOrder user', user);
                // console.log('valueRevenue?.totalAmount', valueRevenue?.totalAmount)
                // res.send(valueRevenue);
                if ((valueRevenue === null || valueRevenue === void 0 ? void 0 : valueRevenue.totalAmount) !== null && (valueRevenue === null || valueRevenue === void 0 ? void 0 : valueRevenue.totalAmount) !== undefined) {
                    valueRevenue.totalAmount = Number(valueRevenue === null || valueRevenue === void 0 ? void 0 : valueRevenue.totalAmount.toString().replace(/[$,]/g, ''));
                }
                valueRevenue.type = 'closure';
                reqRevenue = {
                    id: valueRevenue._id,
                    // detailRevenue:detailRevenue,
                    revenue: valueRevenue,
                    users: user === null || user === void 0 ? void 0 : user._id,
                    dataFiles: dataFiles,
                    files: files,
                    type: valueRevenue.type,
                    noteValid: valueRevenue.noteValid,
                    validAdmin: valueRevenue.validAdmin,
                    usersAdmin: user === null || user === void 0 ? void 0 : user._id
                };
                return [4 /*yield*/, (0, revenue_1.insertOrUpdateRevenueWorkingDay)(reqRevenue)];
            case 1:
                responseOrder = _a.sent();
                res.send(responseOrder);
                return [3 /*break*/, 3];
            case 2:
                e_5 = _a.sent();
                (0, error_handle_1.handleHttp)(res, "ERROR_POST_POSTREVENUEWORKINGDAY", e_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.postRevenueWorkingDay = postRevenueWorkingDay;
var postRevenueOther = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, body, files, valueRevenue, dataFiles, reqRevenue, responseOrder, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log('llegoi por aca');
                user = req.user, body = req.body, files = req.files;
                valueRevenue = JSON.parse(req.body.data.toString());
                valueRevenue.users = user === null || user === void 0 ? void 0 : user._id;
                // res.send(body);
                // var detailRevenue = JSON.parse(req.body.detailRevenue.toString());
                if ((valueRevenue === null || valueRevenue === void 0 ? void 0 : valueRevenue.totalAmount) !== null && (valueRevenue === null || valueRevenue === void 0 ? void 0 : valueRevenue.totalAmount) !== undefined) {
                    valueRevenue.totalAmount = Number(valueRevenue === null || valueRevenue === void 0 ? void 0 : valueRevenue.totalAmount.toString().replace(/[$,]/g, ''));
                }
                dataFiles = [];
                if (req.body.dataFiles !== undefined) {
                    dataFiles = JSON.parse(req.body.dataFiles);
                }
                reqRevenue = {
                    id: valueRevenue._id,
                    // detailRevenue:detailRevenue,
                    revenue: valueRevenue,
                    users: user === null || user === void 0 ? void 0 : user._id,
                    dataFiles: dataFiles,
                    files: files,
                    type: 'other'
                };
                return [4 /*yield*/, (0, revenue_1.insertOrUpdateRevenueOther)(reqRevenue)];
            case 1:
                responseOrder = _a.sent();
                res.send(responseOrder);
                return [3 /*break*/, 3];
            case 2:
                e_6 = _a.sent();
                (0, error_handle_1.handleHttp)(res, "ERROR_POST_POSTREVENUEOTHER", e_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.postRevenueOther = postRevenueOther;
