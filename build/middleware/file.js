"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importStar(require("multer"));
var PATH_STORAGE = "".concat(process.cwd(), "/storage");
var storage = (0, multer_1.diskStorage)({
    destination: function (req, file, cb) {
        cb(null, PATH_STORAGE);
    },
    filename: function (req, file, cb) {
        var ext = file.originalname.split(".").pop();
        var fileNameRandom = "image-".concat(Date.now(), ".").concat(ext);
        cb(null, fileNameRandom);
    },
});
var multerMiddleware = (0, multer_1.default)({ storage: storage }).array('files');
// const multerMiddleware = multer({ storage });
exports.default = multerMiddleware;
// const app = express();
// const data = app.use(fileUpload({
//   useTempFiles : true,
//   tempFileDir : './prueba'
//   // tempFileDir : `${process.cwd()}/uploads`
// }));
// export default data;
