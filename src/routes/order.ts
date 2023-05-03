import { Router, Request, Response } from "express";
import { getOrders, postOrder, consultStatusOrder, searchOrderPaitOut, getOrderDetail, getOrder, searchOrderDetail } from "../controllers/order";
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
router.get('/search-order-paitout', checkJwt,  checkRoleAuth(['User', 'Admin']), searchOrderPaitOut);
router.get('/', checkJwt, checkRoleAuth(['User', 'Admin']), getOrders);
// checkRoleAuth(['User', 'Admin']),
router.get('/:id', checkJwt, checkRoleAuth(['User', 'Admin']), getOrder);
router.get('/status/provider/:id', checkJwt, checkRoleAuth(['User', 'Admin']), consultStatusOrder);

router.get('/detail/:id', checkJwt,  checkRoleAuth(['User', 'Admin']), getOrderDetail);


// router.put('/:id', updateItem);
// checkJwt, checkRoleAuth(['User', 'admin']),
router.post('/',multerMilddleware, checkJwt, checkRoleAuth(['User', 'Admin']), postOrder);
// checkJwt, checkRoleAuth(['User', 'admin']),
router.post('/search/detail',  searchOrderDetail);

// router.delete('/:id', deleteItem);

export { router};


