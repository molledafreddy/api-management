"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const paymentType_1 = require("../controllers/paymentType");
const log_1 = require("../middleware/log");
const roleAuth_1 = require("../middleware/roleAuth");
const session_1 = require("../middleware/session");
/**
 * Esta ruta solo pueden acceder las personas que tienen session activa!
 * que tengan un JWT valido
 * @param param0
 * @param res
 */
const router = (0, express_1.Router)();
exports.router = router;
/**
 * http://localhost:3002/accounts [GET]
 */
//  checkJwt, checkRoleAuth(['User','admin']),
router.get('/', paymentType_1.getPaymentTypes);
router.get('/:id', session_1.checkJwt, (0, roleAuth_1.checkRoleAuth)(['User', 'admin']), log_1.logMiddleware, paymentType_1.getPaymentType);
router.put('/:id', session_1.checkJwt, (0, roleAuth_1.checkRoleAuth)(['User', 'admin']), paymentType_1.updatePaymentType);
router.post('/', session_1.checkJwt, (0, roleAuth_1.checkRoleAuth)(['User', 'admin']), paymentType_1.postPaymentType);
router.delete('/:id', session_1.checkJwt, (0, roleAuth_1.checkRoleAuth)(['User', 'admin']), paymentType_1.deletePaymentType);
//# sourceMappingURL=payment-type.js.map