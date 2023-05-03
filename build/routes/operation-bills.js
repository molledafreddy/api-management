"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var operationBills_1 = require("../controllers/operationBills");
var roleAuth_1 = require("../middleware/roleAuth");
var session_1 = require("../middleware/session");
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
//  checkJwt, checkRoleAuth(['User', 'admin']),
router.get('/', operationBills_1.getOperationBills);
router.get('/search', operationBills_1.getOperationBills);
// checkJwt, checkRoleAuth(['User', 'admin']),
router.get('/:id', operationBills_1.getOperationBill);
router.get('/payment-has-egress/:id', operationBills_1.getPaymentHasEgress);
// router.get('/status/provider/:id', checkJwt, checkRoleAuth(['User', 'admin']), consultStatusOrder);
// router.get('/detail/:id', checkJwt,  checkRoleAuth(['User', 'admin']), getOrderDetail);
router.put('/:id', operationBills_1.updateOperationBills);
// checkJwt,checkRoleAuth(['User', 'admin']),
router.post('/', file_1.default, session_1.checkJwt, (0, roleAuth_1.checkRoleAuth)(['User', 'Admin']), operationBills_1.postOperationBills);
// router.post('/search/detail', checkJwt, checkRoleAuth(['User', 'admin']), searchOrderDetail);
router.delete('/:id', operationBills_1.deleteOperationBills);
