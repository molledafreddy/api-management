import { Router, Request, Response } from "express";
import { getOrders } from "../controllers/order";
import { logMiddleware } from "../middleware/log";
import { checkJwt } from "../middleware/session";

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
router.get('/', checkJwt, getOrders);
// router.get('/:id', logMiddleware, getItem);
// router.put('/:id', updateItem);
// router.post('/', postItem);
// router.delete('/:id', deleteItem);

export { router};