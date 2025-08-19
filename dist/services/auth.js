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
exports.loginUser = exports.registerNewUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_handle_1 = require("../utils/bcrypt.handle");
const jwt_handle_1 = require("../utils/jwt.handle");
const registerNewUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password, name }) {
    const checkIs = yield user_1.default.findOne({ email });
    if (checkIs)
        return "ALREAY_USER";
    const passHash = yield (0, bcrypt_handle_1.encrypt)(password);
    const registerNewUser = yield user_1.default.create({ email, password: passHash, name });
    return registerNewUser;
});
exports.registerNewUser = registerNewUser;
const loginUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
    const checkIs = yield user_1.default.findOne({ email });
    console.log('checkis', checkIs);
    if (!checkIs)
        return "NOT_FOUND_USER";
    const passwordHash = checkIs.password;
    const isCorrect = yield (0, bcrypt_handle_1.verified)(password, passwordHash);
    if (!isCorrect)
        return "NOT_FOUND_USER";
    const token = yield (0, jwt_handle_1.generateToken)(checkIs);
    console.log('usuario encontrado', token);
    const data = {
        token,
        user: checkIs
    };
    return data;
    //Todo el encriptado
});
exports.loginUser = loginUser;
//# sourceMappingURL=auth.js.map