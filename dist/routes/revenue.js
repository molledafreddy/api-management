"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const revenue_1 = require("../controllers/revenue");
const roleAuth_1 = require("../middleware/roleAuth");
const session_1 = require("../middleware/session");
const file_1 = __importDefault(require("../middleware/file"));
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
// router.get('/', checkJwt, checkRoleAuth(['User', 'admin']), getRevenues);
// router.get('revenue-turn/:id', checkJwt, checkRoleAuth(['User', 'admin']), getRevenueTurn);
// router.get('/status/provider/:id', checkJwt, checkRoleAuth(['User', 'admin']), consultStatusOrder);
// router.get('/detail/:id', checkJwt,  checkRoleAuth(['User', 'admin']), getOrderDetail);
// router.put('/:id', updateOperationBills);
// router.post('/upload', upload.single() , postRevenueWorkingDay);
router.get('/get-revenue-turn', session_1.checkJwt, (0, roleAuth_1.checkRoleAuth)(['User', 'admin']), revenue_1.getRevenueTurn);
router.get('/get-revenue-other', session_1.checkJwt, (0, roleAuth_1.checkRoleAuth)(['User', 'admin']), revenue_1.getRevenueOther);
router.get('/:id', session_1.checkJwt, (0, roleAuth_1.checkRoleAuth)(['User', 'admin']), revenue_1.getRevenue);
router.post('/working-day', file_1.default, session_1.checkJwt, (0, roleAuth_1.checkRoleAuth)(['User', 'admin']), revenue_1.postRevenueWorkingDay);
router.post('/other', file_1.default, session_1.checkJwt, (0, roleAuth_1.checkRoleAuth)(['User', 'admin']), revenue_1.postRevenueOther);
//# sourceMappingURL=revenue.js.map