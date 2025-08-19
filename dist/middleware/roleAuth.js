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
exports.checkRoleAuth = void 0;
// import { JwtPayload } from "jsonwebtoken";
// import { RequestExt } from "../interfaces/request-ext.interface";
const jwt_handle_1 = require("../utils/jwt.handle");
const user_1 = __importDefault(require("../models/user"));
const checkRoleAuth = (roles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jwtUser = req.headers.authorization || null;
        const jwt = jwtUser === null || jwtUser === void 0 ? void 0 : jwtUser.split(' ').pop(); // ['Bearer','11111']
        //  const isUser = verifyToken(`${jwt}`) as { id: string};
        const tokenData = yield (0, jwt_handle_1.verifyToken)(`${jwt}`);
        const userData = yield user_1.default.findById(tokenData._id);
        if (roles.findIndex(value => value === (userData === null || userData === void 0 ? void 0 : userData.role)) != -1) {
            console.log('ingreso tienes permisos');
            next();
        }
        else {
            console.log('paso de largo');
            res.status(409);
            res.send({ error: 'No tienes permisos' });
        }
        //  console.log(isUser)
        //  if (!userData) {
        //     res.status(401);
        //     res.status(401);
        //  } else {
        //     req.user = userData;
        //     next();
        //  }
        // console.log({jwt})
        // next();
    }
    catch (e) {
        console.log({ e });
        res.status(400);
        res.send("SESSION_NO_VALIDA");
    }
});
exports.checkRoleAuth = checkRoleAuth;
// const { handleHttpError } = require("../utils/handleError");
// /**
//  * Array con los roles permitidos
//  * @param {*} rol
//  * @returns
//  */
// const checkRol = (roles) => (req, res, next) => {
//   try {
//     const { user } = req;
//     const rolesByUser = user.role; //TODO ["user"]
//     //TODO: ["admin","manager"]
//     const checkValueRol = roles.some((rolSingle) =>
//       rolesByUser.includes(rolSingle)
//     ); //TODO: true, false
//     if (!checkValueRol) {
//       handleHttpError(res, "USER_NOT_PERMISSIONS", 403);
//       return;
//     }
//     next();
//   } catch (e) {
//     handleHttpError(res, "ERROR_PERMISSIONS", 403);
//   }
// };
// module.exports = checkRol;
//# sourceMappingURL=roleAuth.js.map