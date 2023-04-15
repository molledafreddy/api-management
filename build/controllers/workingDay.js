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
exports.deleteItem = exports.postItem = exports.updateItem = exports.getItems = exports.getItem = void 0;
var item_1 = require("../services/item");
var error_handle_1 = require("../utils/error.handle");
var getItem = function (_a, res) {
    var params = _a.params;
    return __awaiter(void 0, void 0, void 0, function () {
        var id, response_1, data, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    id = params.id;
                    return [4 /*yield*/, (0, item_1.getCar)(id)];
                case 1:
                    response_1 = _b.sent();
                    data = response_1 ? response_1 : "NOT_FOUND";
                    res.send(data);
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _b.sent();
                    (0, error_handle_1.handleHttp)(res, "ERROR_GET_ITEM");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getItem = getItem;
var getItems = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response_2, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, item_1.getCars)()];
            case 1:
                response_2 = _a.sent();
                res.send(response_2);
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                (0, error_handle_1.handleHttp)(res, "ERROR_GET_ITEMS");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getItems = getItems;
var updateItem = function (_a, res) {
    var params = _a.params, body = _a.body;
    return __awaiter(void 0, void 0, void 0, function () {
        var id, response_3, e_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    id = params.id;
                    return [4 /*yield*/, (0, item_1.updateCar)(id, body)];
                case 1:
                    response_3 = _b.sent();
                    res.send(response_3);
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _b.sent();
                    (0, error_handle_1.handleHttp)(res, "ERROR_UPDATE_ITEMS");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.updateItem = updateItem;
// req: Request
var postItem = function (_a, res) {
    var body = _a.body;
    return __awaiter(void 0, void 0, void 0, function () {
        var responseItem, e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, item_1.insertCar)(body)];
                case 1:
                    responseItem = _b.sent();
                    res.send(responseItem);
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _b.sent();
                    (0, error_handle_1.handleHttp)(res, "ERROR_POST_ITEMS", e_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.postItem = postItem;
var deleteItem = function (_a, res) {
    var params = _a.params;
    return __awaiter(void 0, void 0, void 0, function () {
        var id, response_4, e_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    id = params.id;
                    return [4 /*yield*/, (0, item_1.deleteCar)(id)];
                case 1:
                    response_4 = _b.sent();
                    res.send(response_4);
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
exports.deleteItem = deleteItem;