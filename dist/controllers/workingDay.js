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
exports.deleteItem = exports.postItem = exports.updateItem = exports.getItems = exports.getItem = void 0;
const item_1 = require("../services/item");
const error_handle_1 = require("../utils/error.handle");
const getItem = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params }, res) {
    try {
        const { id } = params;
        const response = yield (0, item_1.getCar)(id);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_ITEM");
    }
});
exports.getItem = getItem;
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, item_1.getCars)();
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_ITEMS");
    }
});
exports.getItems = getItems;
const updateItem = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params, body }, res) {
    try {
        const { id } = params;
        const response = yield (0, item_1.updateCar)(id, body);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_UPDATE_ITEMS");
    }
});
exports.updateItem = updateItem;
// req: Request
const postItem = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ body }, res) {
    try {
        const responseItem = yield (0, item_1.insertCar)(body);
        res.send(responseItem);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_POST_ITEMS", e);
    }
});
exports.postItem = postItem;
const deleteItem = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params }, res) {
    try {
        const { id } = params;
        const response = yield (0, item_1.deleteCar)(id);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_DELETE_ITEMS");
    }
});
exports.deleteItem = deleteItem;
//# sourceMappingURL=workingDay.js.map