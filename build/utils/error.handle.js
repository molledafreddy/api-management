"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHttp = void 0;
var handleHttp = function (res, error, errorRaw) {
    console.log(errorRaw);
    res.status(500);
    res.send({ error: error });
};
exports.handleHttp = handleHttp;
