"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logMiddleware = void 0;
var logMiddleware = function (req, res, next) {
    var header = req.headers;
    var userAgent = header['user-agent'];
    console.log("Huser-agent", userAgent);
    // next();
};
exports.logMiddleware = logMiddleware;
