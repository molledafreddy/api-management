"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var item_1 = require("../controllers/item");
var log_1 = require("../middleware/log");
var router = (0, express_1.Router)();
exports.router = router;
/**
 * http://localhost:3002/items [GET]
 */
router.get('/', item_1.getItems);
router.get('/:id', log_1.logMiddleware, item_1.getItem);
router.put('/:id', item_1.updateItem);
router.post('/', item_1.postItem);
router.delete('/:id', item_1.deleteItem);
