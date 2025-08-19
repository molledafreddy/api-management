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
exports.deleteTurn = exports.postTurn = exports.updateTurn = exports.getTurnsForUser = exports.getTurns = exports.getTurn = void 0;
const turn_1 = require("../services/turn");
const error_handle_1 = require("../utils/error.handle");
const getTurn = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params }, res) {
    try {
        const { id } = params;
        const response = yield (0, turn_1.getTurn)(id);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_TURN");
    }
});
exports.getTurn = getTurn;
const getTurns = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, turn_1.getCars)();
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_TURNS");
    }
});
exports.getTurns = getTurns;
const getTurnsForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, query } = req;
        query.users = `${user === null || user === void 0 ? void 0 : user._id}`;
        console.log('datos query', query);
        const response = yield (0, turn_1.searchTurnForUser)(query);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_TURNS");
    }
});
exports.getTurnsForUser = getTurnsForUser;
const updateTurn = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params, body }, res) {
    try {
        const { id } = params;
        const response = yield (0, turn_1.updateCar)(id, body);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_UPDATE_TURNS");
    }
});
exports.updateTurn = updateTurn;
const postTurn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, body } = req;
        body.users = `${user === null || user === void 0 ? void 0 : user._id}`;
        // console.log('body',body)
        // res.send(body);
        const responseTurn = yield (0, turn_1.insertTurn)(body);
        res.send(responseTurn);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_POST_TURNS", e);
    }
});
exports.postTurn = postTurn;
const deleteTurn = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params }, res) {
    try {
        const { id } = params;
        const response = yield (0, turn_1.deleteCar)(id);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_DELETE_TURNS");
    }
});
exports.deleteTurn = deleteTurn;
//# sourceMappingURL=turn.js.map