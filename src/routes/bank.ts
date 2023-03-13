import { Router, Request, Response } from "express";
import { getBanks, postBank, getBank, updateBank, deleteBank } from "../controllers/bank";
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
router.get('/', getBanks);
router.get('/:id', logMiddleware, getBank);
router.put('/:id', updateBank);
// checkJwt,
router.post('/', postBank);
router.delete('/:id', deleteBank);

export { router};