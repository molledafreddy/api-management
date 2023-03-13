import { Router, Request, Response } from "express";
import { deleteProvider, getProvider, getProviders, postProvider, updateProvider, getSearchProvider } from "../controllers/provider";
import { logMiddleware } from "../middleware/log";
import { checkJwt } from "../middleware/session";

const router = Router()

/**
 * http://localhost:3002/items [GET]
 */
router.get('/', getProviders);
router.get('/search', getSearchProvider);

// checkJwt,
router.get('/:id',  getProvider);
router.put('/:id', updateProvider);
// checkJwt,
router.post('/', postProvider);
router.delete('/:id', deleteProvider);

export { router};