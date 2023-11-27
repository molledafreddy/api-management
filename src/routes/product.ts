import { Router, Request, Response } from "express";
// import { getAccounts, postAccount, getAccount, updateAccount, deleteAccount } from "../controllers/account";
import { getCategory, postCategory, putProduct, getProductId, getAllCategory, getProducts, postProduct, postProductDelivery, getSearchProduct} from "../controllers/product";
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

router.get('/all/category', getAllCategory);
router.get('/category', getCategory);
router.post('/category', postCategory);

router.get('/search', getSearchProduct);
router.get('/:id', getProductId);
router.get('/:idCategory/:clasification?/:status?', getProducts);
router.post('/', postProduct);
router.put('/:id', putProduct);

router.post('/delivery', postProductDelivery);
// logMiddleware,
// router.get('/:id',  getAccount);
// router.put('/:id', updateAccount);
// // checkJwt,
// router.post('/', postAccount);
// router.delete('/:id', deleteAccount);

export { router};