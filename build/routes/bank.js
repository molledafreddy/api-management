"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var bank_1 = require("../controllers/bank");
var log_1 = require("../middleware/log");
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
//  checkJwt, checkRoleAuth(['User', 'admin']), 
router.get('/', bank_1.getBanks);
router.get('/:id', log_1.logMiddleware, bank_1.getBank);
router.put('/:id', bank_1.updateBank);
// checkJwt,
router.post('/', bank_1.postBank);
router.delete('/:id', bank_1.deleteBank);
