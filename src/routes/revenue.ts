import { Router, Request, Response } from "express";
import {  getRevenue, 
    getRevenues, 
    postRevenueWorkingDay, 
    getRevenueTurn,
    getRevenueOther, 
    postRevenueOther } from "../controllers/revenue";
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
// router.get('/', checkJwt, checkRoleAuth(['User', 'admin']), getRevenues);

// router.get('revenue-turn/:id', checkJwt, checkRoleAuth(['User', 'admin']), getRevenueTurn);
// router.get('/status/provider/:id', checkJwt, checkRoleAuth(['User', 'admin']), consultStatusOrder);

// router.get('/detail/:id', checkJwt,  checkRoleAuth(['User', 'admin']), getOrderDetail);
// router.put('/:id', updateOperationBills);
// router.post('/upload', upload.single() , postRevenueWorkingDay);

router.get('/get-revenue-turn', checkJwt,checkRoleAuth(['User', 'Admin']), getRevenueTurn);
router.get('/get-revenue-other', checkJwt,checkRoleAuth(['User', 'Admin']), getRevenueOther);
router.get('/:id', checkJwt, checkRoleAuth(['User', 'Admin']), getRevenue);
router.post('/working-day', multerMilddleware, checkJwt,checkRoleAuth(['User', 'Admin']), postRevenueWorkingDay);
router.post('/other', multerMilddleware, checkJwt,checkRoleAuth(['User', 'Admin']), postRevenueOther);
// multerMilddleware.single('invoiceFile')
// router.get('/data', checkJwt, multerMilddleware.single('myfile'), getFile);

// router.post('/search/detail', checkJwt, checkRoleAuth(['User', 'admin']), searchOrderDetail);

// router.delete('/:id', deleteOperationBills);

export { router};


