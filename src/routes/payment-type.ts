import { Router, Request, Response } from "express";
import { getPaymentTypes, postPaymentType, getPaymentType, updatePaymentType, deletePaymentType } from "../controllers/paymentType";
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
//  checkJwt, checkRoleAuth(['User','admin']),
router.get('/',  getPaymentTypes);
router.get('/:id',checkJwt, checkRoleAuth(['User','Admin']), logMiddleware, getPaymentType);
router.put('/:id',checkJwt, checkRoleAuth(['User','Admin']), updatePaymentType);
router.post('/',checkJwt,checkRoleAuth(['User','Admin']), postPaymentType);
router.delete('/:id',checkJwt, checkRoleAuth(['User','Admin']), deletePaymentType);

export { router};