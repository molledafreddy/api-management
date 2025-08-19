"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const order_1 = require("../controllers/order");
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
 * http://localhost:3002/items [GET]
 */
router.get('/', session_1.checkJwt, order_1.getOrders);
//# sourceMappingURL=user.js.map