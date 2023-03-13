import { Router, Request, Response } from "express";
import { getAccounts, postAccount, getAccount, updateAccount, deleteAccount } from "../controllers/account";
import { logMiddleware } from "../middleware/log";
import { checkRoleAuth } from "../middleware/roleAuth";
import { checkJwt } from "../middleware/session";

/**
 * Esta ruta solo pueden acceder las personas que tienen session activa!
 * que tengan un JWT valido
 * @param param0 
 * @param res 
 */

const router = Router()

/**
 * http://localhost:3002/accounts [GET]
 */
//  checkJwt, checkRoleAuth(['User', 'admin']),
router.get('/', checkJwt, checkRoleAuth(['User', 'admin']), getAccounts);
// logMiddleware,
router.get('/:id',  getAccount);
router.put('/:id', updateAccount);
// checkJwt,
router.post('/', postAccount);
router.delete('/:id', deleteAccount);

export { router};