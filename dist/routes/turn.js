"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const turn_1 = require("../controllers/turn");
const session_1 = require("../middleware/session");
const roleAuth_1 = require("../middleware/roleAuth");
const router = (0, express_1.Router)();
exports.router = router;
/**
 * http://localhost:3002/items [GET]
 */
// router.get('/', checkJwt, checkRoleAuth(['User', 'admin']), getTurn);
router.get('/:id', session_1.checkJwt, (0, roleAuth_1.checkRoleAuth)(['User', 'admin']), turn_1.getTurn);
router.put('/:id', turn_1.updateTurn);
router.post('/', session_1.checkJwt, turn_1.postTurn);
router.delete('/:id', turn_1.deleteTurn);
// logMiddleware,
router.get('/search/for/user', session_1.checkJwt, (0, roleAuth_1.checkRoleAuth)(['User', 'admin']), turn_1.getTurnsForUser);
//# sourceMappingURL=turn.js.map