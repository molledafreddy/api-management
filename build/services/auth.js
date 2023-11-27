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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerNewUser = void 0;
var user_1 = __importDefault(require("../models/user"));
var bcrypt_handle_1 = require("../utils/bcrypt.handle");
var jwt_handle_1 = require("../utils/jwt.handle");
var registerNewUser = function (_a) {
    var email = _a.email, password = _a.password, name = _a.name, role = _a.role;
    return __awaiter(void 0, void 0, void 0, function () {
        var dataEmail, checkIs, passHash, registerNewUser;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dataEmail = email.toLowerCase();
                    console.log('dataEmail', dataEmail);
                    return [4 /*yield*/, user_1.default.find({ email: dataEmail })];
                case 1:
                    checkIs = _b.sent();
                    console.log('checkIs', checkIs);
                    if (checkIs.length > 0)
                        return [2 /*return*/, "ALREAY_USER"];
                    return [4 /*yield*/, (0, bcrypt_handle_1.encrypt)(password)];
                case 2:
                    passHash = _b.sent();
                    return [4 /*yield*/, user_1.default.create({ email: dataEmail, password: passHash, name: name, role: role })];
                case 3:
                    registerNewUser = _b.sent();
                    console.log('registerNewUser', registerNewUser);
                    return [2 /*return*/, registerNewUser];
            }
        });
    });
};
exports.registerNewUser = registerNewUser;
var loginUser = function (_a) {
    var email = _a.email, password = _a.password;
    return __awaiter(void 0, void 0, void 0, function () {
        var dataEmail, checkIs, passwordHash, isCorrect, token, data;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    dataEmail = email.toLowerCase();
                    return [4 /*yield*/, user_1.default.find({ email: dataEmail })];
                case 1:
                    checkIs = _c.sent();
                    if ((checkIs === null || checkIs === void 0 ? void 0 : checkIs.length) === 0)
                        return [2 /*return*/, "NOT_FOUND_USER"];
                    passwordHash = (_b = checkIs[0]) === null || _b === void 0 ? void 0 : _b.password;
                    return [4 /*yield*/, (0, bcrypt_handle_1.verified)(password, passwordHash)];
                case 2:
                    isCorrect = _c.sent();
                    if (!isCorrect)
                        return [2 /*return*/, "NOT_FOUND_USER"];
                    return [4 /*yield*/, (0, jwt_handle_1.generateToken)(checkIs[0])];
                case 3:
                    token = _c.sent();
                    data = {
                        token: token,
                        user: checkIs[0]
                    };
                    return [2 /*return*/, data];
            }
        });
    });
};
exports.loginUser = loginUser;
