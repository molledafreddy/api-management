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
exports.deleteWorkingDay = exports.updatetWorkingDay = exports.getWorkingDay = exports.getWorkingDays = exports.getWorkingForDate = exports.insertWorkingDay = void 0;
const workingDay_1 = __importDefault(require("../models/workingDay"));
const insertWorkingDay = () => __awaiter(void 0, void 0, void 0, function* () {
    // const resultDate = await getWorkingForDate();
    // Object.keys(resultDate).length === 0
    const workingD = yield {
        type: 'normal'
    };
    // console.log('retorno de Object', Object.keys(resultDate).length )
    // if ( Object.keys(resultDate).length == 0) {
    const responseInsert = yield workingDay_1.default.create(workingD);
    return responseInsert;
    console.log('no tiene registros');
    // } else {
    //     console.log('si tiene registros');
    // }
    // return responseInsert;
});
exports.insertWorkingDay = insertWorkingDay;
const getWorkingForDate = () => __awaiter(void 0, void 0, void 0, function* () {
    let now = new Date();
    const formatoMap = {
        dd: now.getDate(),
        mm: now.getMonth() + 1,
        yy: now.getFullYear().toString().slice(-2),
        yyyy: now.getFullYear()
    };
    var dateStr = new Date(formatoMap.yyyy, formatoMap.mm, formatoMap.dd, 0, 0, 0);
    var nextDate = new Date(formatoMap.yyyy, formatoMap.mm, formatoMap.dd, 23, 59, 59);
    const responseItem = yield workingDay_1.default.find({
        created_at: {
            $gte: dateStr,
            $lt: nextDate
        }
    });
    return responseItem;
});
exports.getWorkingForDate = getWorkingForDate;
const getWorkingDays = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield workingDay_1.default.find({});
    return responseItem;
});
exports.getWorkingDays = getWorkingDays;
const getWorkingDay = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield workingDay_1.default.findOne({ _id: id });
    return responseItem;
});
exports.getWorkingDay = getWorkingDay;
const updatetWorkingDay = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield workingDay_1.default.findOneAndUpdate({ _id: id }, data, { new: true });
    return responseItem;
});
exports.updatetWorkingDay = updatetWorkingDay;
const deleteWorkingDay = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield workingDay_1.default.remove({ _id: id });
    return responseItem;
});
exports.deleteWorkingDay = deleteWorkingDay;
//# sourceMappingURL=workingDay.js.map