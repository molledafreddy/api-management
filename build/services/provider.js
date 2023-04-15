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
exports.deleteProvider = exports.updateProvider = exports.getSearchProvider = exports.getProvider = exports.getProviders = exports.insertProvider = void 0;
var Provider_1 = __importDefault(require("../models/Provider"));
var insertProvider = function (provider) { return __awaiter(void 0, void 0, void 0, function () {
    var responseInsert;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Provider_1.default.create(provider)];
            case 1:
                responseInsert = _a.sent();
                return [2 /*return*/, responseInsert];
        }
    });
}); };
exports.insertProvider = insertProvider;
var validTurn = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var now, formatoMap, dateStr, nextDate, responseTurn;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                now = new Date();
                formatoMap = {
                    dd: now.getDate(),
                    mm: now.getMonth() + 1,
                    yy: now.getFullYear().toString().slice(-2),
                    yyyy: now.getFullYear()
                };
                dateStr = new Date(formatoMap.yyyy, formatoMap.mm, formatoMap.dd, 0, 0, 0);
                nextDate = new Date(formatoMap.yyyy, formatoMap.mm, formatoMap.dd, 23, 59, 59);
                return [4 /*yield*/, Provider_1.default.find({
                        created_at: {
                            $gte: dateStr,
                            $lt: nextDate
                        },
                        users: userId
                    })];
            case 1:
                responseTurn = _a.sent();
                // const responseItem = await Turn.findOne({_id:id});
                return [2 /*return*/, responseTurn];
        }
    });
}); };
var getSearchProvider = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var valid, search, options, responseItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                valid = {};
                search = query.search || null;
                options = {
                    page: parseInt(query.page, 10) || 1,
                    limit: parseInt(query.limit, 10) || 10
                };
                if (search != null) {
                    valid = {
                        $text: {
                            $search: "\"".concat(search, "\" authority key")
                        }
                    };
                }
                return [4 /*yield*/, Provider_1.default.paginate(valid, options)];
            case 1:
                responseItem = _a.sent();
                return [2 /*return*/, responseItem];
        }
    });
}); };
exports.getSearchProvider = getSearchProvider;
var getProviders = function () { return __awaiter(void 0, void 0, void 0, function () {
    var responseItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Provider_1.default.find({})];
            case 1:
                responseItem = _a.sent();
                return [2 /*return*/, responseItem];
        }
    });
}); };
exports.getProviders = getProviders;
var getProvider = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var responseItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Provider_1.default.findOne({ _id: id })];
            case 1:
                responseItem = _a.sent();
                return [2 /*return*/, responseItem];
        }
    });
}); };
exports.getProvider = getProvider;
var updateProvider = function (id, data) { return __awaiter(void 0, void 0, void 0, function () {
    var responseItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Provider_1.default.findOneAndUpdate({ _id: id }, data, { new: true })];
            case 1:
                responseItem = _a.sent();
                return [2 /*return*/, responseItem];
        }
    });
}); };
exports.updateProvider = updateProvider;
var deleteProvider = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var responseItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Provider_1.default.remove({ _id: id })];
            case 1:
                responseItem = _a.sent();
                return [2 /*return*/, responseItem];
        }
    });
}); };
exports.deleteProvider = deleteProvider;
