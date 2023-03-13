import { Router, Request, Response } from "express";
import { deleteItem, getItem, getItems, postItem, updateItem } from "../controllers/item";
import { logMiddleware } from "../middleware/log";

const router = Router()

/**
 * http://localhost:3002/items [GET]
 */
router.get('/', getItems);
router.get('/:id', logMiddleware, getItem);
router.put('/:id', updateItem);
router.post('/', postItem);
router.delete('/:id', deleteItem);

export { router};