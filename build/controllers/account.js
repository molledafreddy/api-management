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
exports.deleteAccount = exports.updateAccount = exports.postAccount = exports.getAccount = exports.getAccounts = void 0;
var account_1 = require("../services/account");
var error_handle_1 = require("../utils/error.handle");
var getAccount = function (_a, res) {
    var params = _a.params;
    return __awaiter(void 0, void 0, void 0, function () {
        var id, response, data, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    id = params.id;
                    return [4 /*yield*/, (0, account_1.getAccount)(id)];
                case 1:
                    response = _b.sent();
                    data = response ? response : "NOT_FOUND";
                    res.send(data);
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _b.sent();
                    (0, error_handle_1.handleHttp)(res, "ERROR_GET_ACCOUNT");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getAccount = getAccount;
var getAccounts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, response, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                query = req.query;
                return [4 /*yield*/, (0, account_1.getAccounts)(query)];
            case 1:
                response = _a.sent();
                res.send(response);
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                console.log('error', e_2);
                (0, error_handle_1.handleHttp)(res, "ERROR_GET_ACCOUNTS");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAccounts = getAccounts;
var postAccount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, body, responseOrder, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.user, body = req.body;
                body.users = "".concat(user === null || user === void 0 ? void 0 : user._id);
                return [4 /*yield*/, (0, account_1.insertAccount)(body)];
            case 1:
                responseOrder = _a.sent();
                res.send(responseOrder);
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                (0, error_handle_1.handleHttp)(res, "ERROR_POST_ACCOUNTS", e_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.postAccount = postAccount;
var updateAccount = function (_a, res) {
    var params = _a.params, body = _a.body;
    return __awaiter(void 0, void 0, void 0, function () {
        var id, response, e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    id = params.id;
                    return [4 /*yield*/, (0, account_1.updateAccount)(id, body)];
                case 1:
                    response = _b.sent();
                    res.send(response);
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _b.sent();
                    (0, error_handle_1.handleHttp)(res, "ERROR_UPDATE_ACCOUNTS");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.updateAccount = updateAccount;
var deleteAccount = function (_a, res) {
    var params = _a.params;
    return __awaiter(void 0, void 0, void 0, function () {
        var id, response, e_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    id = params.id;
                    return [4 /*yield*/, (0, account_1.deleteAccount)(id)];
                case 1:
                    response = _b.sent();
                    res.send(response);
                    return [3 /*break*/, 3];
                case 2:
                    e_5 = _b.sent();
                    (0, error_handle_1.handleHttp)(res, "ERROR_DELETE_ITEMS");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.deleteAccount = deleteAccount;
