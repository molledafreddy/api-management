"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var order_1 = require("../controllers/order");
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
router.get('/search-order-paitout', session_1.checkJwt, (0, roleAuth_1.checkRoleAuth)(['User', 'Admin']), order_1.searchOrderPaitOut);
router.get('/', session_1.checkJwt, (0, roleAuth_1.checkRoleAuth)(['User', 'Admin']), order_1.getOrders);
router.get('/:id', session_1.checkJwt, (0, roleAuth_1.checkRoleAuth)(['User', 'Admin']), order_1.getOrder);
router.get('/status/provider/:id', session_1.checkJwt, (0, roleAuth_1.checkRoleAuth)(['User', 'Admin']), order_1.consultStatusOrder);
router.get('/detail/:id', session_1.checkJwt, (0, roleAuth_1.checkRoleAuth)(['User', 'Admin']), order_1.getOrderDetail);
// router.put('/:id', updateItem);
// checkJwt, checkRoleAuth(['User', 'admin']),
router.post('/', file_1.default, session_1.checkJwt, (0, roleAuth_1.checkRoleAuth)(['User', 'Admin']), order_1.postOrder);
// checkJwt, checkRoleAuth(['User', 'admin']),
router.post('/search/detail', order_1.searchOrderDetail);
