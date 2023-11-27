import { Router, Request, Response } from "express";
import { getSearchProductDelivery, putProductDelivery, getProductDeliveryId, getProductHasDelivery,  postProductDelivery} from "../controllers/productDelivery";
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

router.get('/search', getSearchProductDelivery);
router.get('/:id', getProductDeliveryId);
router.put('/:id', putProductDelivery);
router.get('/product-has-delivery/:id',getProductHasDelivery);
// router.get('/category', getCategory);
// router.post('/category', postCategory);

// router.get('/search', getSearchProduct);
// router.get('/:idCategory/:clasification?/:status?', getProducts);
// router.post('/', postProduct);

router.post('/delivery', postProductDelivery);
// logMiddleware,
// router.get('/:id',  getAccount);
// router.put('/:id', updateAccount);
// // checkJwt,
// router.post('/', postAccount);
// router.delete('/:id', deleteAccount);

export { router};