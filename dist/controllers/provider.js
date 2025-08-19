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
exports.deleteProvider = exports.postProvider = exports.updateProvider = exports.getSearchProvider = exports.getProviders = exports.getProvider = void 0;
const provider_1 = require("../services/provider");
const error_handle_1 = require("../utils/error.handle");
const getProvider = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params }, res) {
    try {
        const { id } = params;
        const response = yield (0, provider_1.getProvider)(id);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_ITEM");
    }
});
exports.getProvider = getProvider;
const getSearchProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const response = yield (0, provider_1.getSearchProvider)(query);
        res.send(response);
    }
    catch (e) {
        console.log('error', e);
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_SEARCH_PROVIDERS");
    }
});
exports.getSearchProvider = getSearchProvider;
const getProviders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, provider_1.getProviders)();
        res.send(response);
    }
    catch (e) {
        console.log('error', e);
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_PROVIDERS");
    }
});
exports.getProviders = getProviders;
const updateProvider = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params, body }, res) {
    try {
        const { id } = params;
        const response = yield (0, provider_1.updateProvider)(id, body);
        // const response = await updateProvider(id, body);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_UPDATE_PROVIDERS");
    }
});
exports.updateProvider = updateProvider;
const postProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const responseTurn = yield (0, provider_1.insertProvider)(body);
        res.send(responseTurn);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_POST_PROVIDERS", e);
    }
});
exports.postProvider = postProvider;
const deleteProvider = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params }, res) {
    try {
        const { id } = params;
        const response = yield (0, provider_1.deleteProvider)(id);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_DELETE_ITEMS");
    }
});
exports.deleteProvider = deleteProvider;
//# sourceMappingURL=provider.js.map