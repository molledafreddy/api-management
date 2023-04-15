"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
var error_handle_1 = require("../utils/error.handle");
var getUsers = function (req, res) {
    try {
        res.send({
            data: "ESTO SOLO LO VE LAS PERSONS CON SESSION / JWT",
            user: req.user,
        });
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_BLOGS");
    }
};
exports.getUsers = getUsers;
