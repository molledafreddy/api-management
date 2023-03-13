import { Router, Request, Response } from "express";
import { getOperationBills, getPaymentHasEgress, postOperationBills, getOperationBill, updateOperationBills, deleteOperationBills } from "../controllers/operationBills";
import { logMiddleware } from "../middleware/log";
import { checkRoleAuth } from "../middleware/roleAuth";
import { checkJwt } from "../middleware/session";
import multerMilddleware from "../middleware/file";

/**
 * Esta ruta solo pueden acceder las personas que tienen session activa!
 * que tengan un JWT valido
 * @param param0 
 * @param res 
 */

const router = Router()

/**
 * http://localhost:3002/items [GET]
 */
//  checkJwt, checkRoleAuth(['User', 'admin']),
router.get('/',  getOperationBills);
router.get('/search',  getOperationBills);
// checkJwt, checkRoleAuth(['User', 'admin']),
router.get('/:id',  getOperationBill);
router.get('/payment-has-egress/:id',getPaymentHasEgress);
// router.get('/status/provider/:id', checkJwt, checkRoleAuth(['User', 'admin']), consultStatusOrder);

// router.get('/detail/:id', checkJwt,  checkRoleAuth(['User', 'admin']), getOrderDetail);
router.put('/:id', updateOperationBills);
// checkJwt,checkRoleAuth(['User', 'admin']),
router.post('/',multerMilddleware,  postOperationBills);
// router.post('/search/detail', checkJwt, checkRoleAuth(['User', 'admin']), searchOrderDetail);

router.delete('/:id', deleteOperationBills);

export { router};


