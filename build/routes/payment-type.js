"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var paymentType_1 = require("../controllers/paymentType");
var log_1 = require("../middleware/log");
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
 * http://localhost:3002/accounts [GET]
 */
//  checkJwt, checkRoleAuth(['User','admin']),
router.get('/', paymentType_1.getPaymentTypes);
router.get('/:id', session_1.checkJwt, (0, roleAuth_1.checkRoleAuth)(['User', 'Admin']), log_1.logMiddleware, paymentType_1.getPaymentType);
router.put('/:id', session_1.checkJwt, (0, roleAuth_1.checkRoleAuth)(['User', 'Admin']), paymentType_1.updatePaymentType);
router.post('/', session_1.checkJwt, (0, roleAuth_1.checkRoleAuth)(['User', 'Admin']), paymentType_1.postPaymentType);
router.delete('/:id', session_1.checkJwt, (0, roleAuth_1.checkRoleAuth)(['User', 'Admin']), paymentType_1.deletePaymentType);
