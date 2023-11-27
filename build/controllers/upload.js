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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImg = exports.postImg = exports.getFile = void 0;
var storage_1 = require("../services/storage");
var error_handle_1 = require("../utils/error.handle");
var getFile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, file, dataToRegister, coche, json, coche2, detailRevenue;
    return __generator(this, function (_a) {
        try {
            console.log('llego po asca getFilegetFilegetFilegetFile', req.body.revenue);
            user = req.user, file = req.file;
            dataToRegister = {
                fileName: "".concat(file === null || file === void 0 ? void 0 : file.filename),
                idUser: "".concat(user === null || user === void 0 ? void 0 : user._id),
                path: "".concat(file === null || file === void 0 ? void 0 : file.path),
            };
            coche = JSON.parse(req.body.revenue.toString());
            json = JSON.stringify(coche);
            coche2 = JSON.parse(req.body.detailRevenue.toString());
            detailRevenue = JSON.stringify(coche2);
            console.log('file?.path', file === null || file === void 0 ? void 0 : file.path);
            // const res = claudinary.uploader.
            //   upload('https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg', {public_id: "olympic_flag"})
            // res.then((data) => {
            //   console.log(data);
            //   console.log(data.secure_url);
            // }).catch((err) => {
            //   console.log(err);
            // });
            // JSON.parse('[1, 2, 3, 4, ]');
            // const response = await registerUpload(dataToRegister);
            // res.send(response);
            res.send(req.body);
        }
        catch (e) {
            console.log(e);
            (0, error_handle_1.handleHttp)(res, "ERROR_GET_BLOG");
        }
        return [2 /*return*/];
    });
}); };
exports.getFile = getFile;
var postImg = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, files, dataToRegister, response, dataFiles, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                user = req.user, files = req.files;
                dataToRegister = {
                    fileName: "".concat(files === null || files === void 0 ? void 0 : files.filename),
                    idUser: "".concat(user === null || user === void 0 ? void 0 : user._id),
                    path: "".concat(files === null || files === void 0 ? void 0 : files.path),
                };
                response = [];
                dataFiles = [];
                dataFiles.files = files;
                if (!(Object.keys(dataFiles.files).length > 0)) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, storage_1.registerUploadCloudinary)(dataFiles)];
            case 1:
                // console.log('dataFiles', dataFiles)
                response = _a.sent();
                _a.label = 2;
            case 2:
                console.log('response', response);
                res.send(response);
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                console.log(e_1);
                (0, error_handle_1.handleHttp)(res, "ERROR_GET_BLOG");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.postImg = postImg;
var deleteImg = function (_a, res) {
    var params = _a.params;
    return __awaiter(void 0, void 0, void 0, function () {
        var id, response, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    id = params.id;
                    console.log('id', id);
                    return [4 /*yield*/, (0, storage_1.deleteImage)(id)];
                case 1:
                    response = _b.sent();
                    res.send(response);
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _b.sent();
                    console.log(e_2);
                    (0, error_handle_1.handleHttp)(res, "ERROR_GET_BLOG");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.deleteImg = deleteImg;
