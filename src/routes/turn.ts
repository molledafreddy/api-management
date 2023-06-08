import { Router, Request, Response } from "express";
import { deleteTurn, getTurn, getValidTurn, getTurnsForUser, getTurns, postTurn, updateTurn } from "../controllers/turn";
import { logMiddleware } from "../middleware/log";
import { checkJwt } from "../middleware/session";
import { checkRoleAuth } from "../middleware/roleAuth";

const router = Router()

/**
 * http://localhost:3002/items [GET]
 */
// router.get('/', checkJwt, checkRoleAuth(['User', 'admin']), getTurn);
router.get('/:id', checkJwt, checkRoleAuth(['User', 'Admin']), getTurn);
router.put('/:id', updateTurn);
router.post('/',checkJwt, postTurn);
router.delete('/:id', deleteTurn);
router.get('/validTurn/:id', getValidTurn);
// logMiddleware,
router.get('/search/for/user', checkJwt, checkRoleAuth(['User', 'Admin']), getTurnsForUser);

export { router};