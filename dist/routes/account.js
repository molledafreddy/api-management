"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const account_1 = require("../controllers/account");
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
//  checkJwt, checkRoleAuth(['User', 'admin']),
router.get('/', session_1.checkJwt, (0, roleAuth_1.checkRoleAuth)(['User', 'admin']), account_1.getAccounts);
// logMiddleware,
router.get('/:id', account_1.getAccount);
router.put('/:id', account_1.updateAccount);
// checkJwt,
router.post('/', account_1.postAccount);
router.delete('/:id', account_1.deleteAccount);
//# sourceMappingURL=account.js.map