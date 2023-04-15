"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var egress_1 = require("../controllers/egress");
var roleAuth_1 = require("../middleware/roleAuth");
var session_1 = require("../middleware/session");
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
// router.get('/search-order-paitout', checkJwt,  checkRoleAuth(['User', 'admin']), searchOrderPaitOut);
// router.get('/', checkJwt, checkRoleAuth(['User', 'admin']), getOrders);
// router.get('/:id', checkJwt, checkRoleAuth(['User', 'admin']), getOrder);
// router.get('/status/provider/:id', checkJwt, checkRoleAuth(['User', 'admin']), consultStatusOrder);
// router.get('/detail/:id', checkJwt,  checkRoleAuth(['User', 'admin']), getOrderDetail);
// router.put('/:id', updateItem);
// checkJwt, checkRoleAuth(['User', 'admin']),
// router.post('/',multerMilddleware, checkJwt, checkRoleAuth(['User', 'admin']), postOrder);
// checkJwt, checkRoleAuth(['User', 'admin']),
router.post('/search', session_1.checkJwt, (0, roleAuth_1.checkRoleAuth)(['User', 'admin']), egress_1.searchEgress);
