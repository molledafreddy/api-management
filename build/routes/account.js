"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var account_1 = require("../controllers/account");
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
//  checkJwt, checkRoleAuth(['User', 'admin']),
router.get('/', session_1.checkJwt, (0, roleAuth_1.checkRoleAuth)(['User', 'Admin']), account_1.getAccounts);
// logMiddleware,
router.get('/:id', account_1.getAccount);
router.put('/:id', account_1.updateAccount);
// checkJwt,
router.post('/', account_1.postAccount);
router.delete('/:id', account_1.deleteAccount);
