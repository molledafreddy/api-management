"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const jwt_handle_1 = require("../utils/jwt.handle");
const checkJwt = (req, res, next) => {
    try {
        const jwtUser = req.headers.authorization || null;
        const jwt = jwtUser === null || jwtUser === void 0 ? void 0 : jwtUser.split(' ').pop(); // ['Bearer','11111']
        const isUser = (0, jwt_handle_1.verifyToken)(`${jwt}`);
        if (!isUser) {
            return res.status(401).json({
                error: "SESSION_NO_VALIDA",
                message: "Token inválido o expirado"
            });
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
        console.log({ e });
        return res.status(401).json({
            error: "SESSION_NO_VALIDA",
            message: "Error en autenticación"
        });
    }
};
exports.checkJwt = checkJwt;
//# sourceMappingURL=session.js.map