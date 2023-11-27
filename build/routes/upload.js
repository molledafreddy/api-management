"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var upload_1 = require("../controllers/upload");
var file_1 = __importDefault(require("../middleware/file"));
/**
 * Esta ruta solo pueden acceder las personas que tienen session activa!
 * que tengan un JWT valido
 * @param param0
 * @param res
 */
var router = (0, express_1.Router)();
exports.router = router;
/**
 * http://localhost:3002/items [GET]
 */
//  multerMilddleware.single('myfile')
// router.get('/data',multerMilddleware, checkJwt, getFile);
// multerMilddleware.single('myfile')
// router.get('/:id', logMiddleware, getItem);
router.get('/:img', function (req, res) {
    var PATH_STORAGE = "".concat(process.cwd(), "/storage/").concat(req.params.img);
    res.sendFile(PATH_STORAGE);
});
// router.put('/:id', updateItem);
router.post('/', file_1.default, upload_1.postImg);
router.delete('/:id', file_1.default, upload_1.deleteImg);
