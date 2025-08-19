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
exports.deleteProvider = exports.updateProvider = exports.getSearchProvider = exports.getProvider = exports.getProviders = exports.insertProvider = void 0;
const Provider_1 = __importDefault(require("../models/Provider"));
const insertProvider = (provider) => __awaiter(void 0, void 0, void 0, function* () {
    const responseInsert = yield Provider_1.default.create(provider);
    return responseInsert;
});
exports.insertProvider = insertProvider;
const validTurn = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    let now = new Date();
    const formatoMap = {
        dd: now.getDate(),
        mm: now.getMonth() + 1,
        yy: now.getFullYear().toString().slice(-2),
        yyyy: now.getFullYear()
    };
    var dateStr = new Date(formatoMap.yyyy, formatoMap.mm, formatoMap.dd, 0, 0, 0);
    var nextDate = new Date(formatoMap.yyyy, formatoMap.mm, formatoMap.dd, 23, 59, 59);
    const responseTurn = yield Provider_1.default.find({
        created_at: {
            $gte: dateStr,
            $lt: nextDate
        },
        users: userId
    });
    // const responseItem = await Turn.findOne({_id:id});
    return responseTurn;
});
const getSearchProvider = (query) => __awaiter(void 0, void 0, void 0, function* () {
    let valid = {};
    const search = query.search || null;
    const options = {
        page: parseInt(query.page, 10) || 1,
        limit: parseInt(query.limit, 10) || 10
    };
    if (search != null) {
        valid = {
            $text: {
                $search: `\"${search}\" authority key`
            }
        };
    }
    const responseItem = yield Provider_1.default.paginate(valid, options);
    return responseItem;
});
exports.getSearchProvider = getSearchProvider;
const getProviders = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield Provider_1.default.find({});
    return responseItem;
});
exports.getProviders = getProviders;
const getProvider = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield Provider_1.default.findOne({ _id: id });
    return responseItem;
});
exports.getProvider = getProvider;
const updateProvider = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield Provider_1.default.findOneAndUpdate({ _id: id }, data, { new: true });
    return responseItem;
});
exports.updateProvider = updateProvider;
const deleteProvider = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield Provider_1.default.remove({ _id: id });
    return responseItem;
});
exports.deleteProvider = deleteProvider;
//# sourceMappingURL=provider.js.map