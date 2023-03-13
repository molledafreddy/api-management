import { Router, Request, Response } from "express";
import { getFile } from "../controllers/upload";
import multerMilddleware from "../middleware/file";
// import data from "../middleware/file";
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
//  multerMilddleware.single('myfile')
// router.get('/data',multerMilddleware, checkJwt, getFile);
// multerMilddleware.single('myfile')
// router.get('/:id', logMiddleware, getItem);
router.get('/:img', function(req, res){
    const PATH_STORAGE = `${process.cwd()}/storage/${req.params.img}`;
    res.sendFile(PATH_STORAGE);
});
// router.put('/:id', updateItem);
// router.post('/', postItem);
// router.delete('/:id', deleteItem);

export { router};