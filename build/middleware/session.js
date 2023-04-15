"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
var jwt_handle_1 = require("../utils/jwt.handle");
var checkJwt = function (req, res, next) {
    try {
        var jwtUser = req.headers.authorization || null;
        var jwt = jwtUser === null || jwtUser === void 0 ? void 0 : jwtUser.split(' ').pop(); // ['Bearer','11111']
        var isUser = (0, jwt_handle_1.verifyToken)("".concat(jwt));
        if (!isUser) {
            res.status(401);
            res.status(401);
        }
        else {
            //  console.log('checkJwt llego aca',isUser._id)
            req.user = isUser;
            next();
        }
        // console.log({jwt})
        // next();
    }
    catch (e) {
        console.log({ e: e });
        res.status(400);
        res.send("SESSION_NO_VALIDA");
    }
};
exports.checkJwt = checkJwt;
