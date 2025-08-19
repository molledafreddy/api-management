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
exports.getFile = void 0;
const error_handle_1 = require("../utils/error.handle");
const getFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('llego po asca getFilegetFilegetFilegetFile', req.body.revenue);
        const { user, file } = req;
        const dataToRegister = {
            fileName: `${file === null || file === void 0 ? void 0 : file.filename}`,
            idUser: `${user === null || user === void 0 ? void 0 : user._id}`,
            path: `${file === null || file === void 0 ? void 0 : file.path}`,
        };
        var coche = JSON.parse(req.body.revenue.toString());
        var json = JSON.stringify(coche);
        var coche2 = JSON.parse(req.body.detailRevenue.toString());
        var detailRevenue = JSON.stringify(coche2);
        // JSON.parse('[1, 2, 3, 4, ]');
        // const response = await registerUpload(dataToRegister);
        // res.send(response);
        res.send(req.body);
    }
    catch (e) {
        console.log(e);
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_BLOG");
    }
});
exports.getFile = getFile;
//# sourceMappingURL=upload.js.map