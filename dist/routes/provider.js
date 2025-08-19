"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const provider_1 = require("../controllers/provider");
const router = (0, express_1.Router)();
exports.router = router;
/**
 * http://localhost:3002/items [GET]
 */
router.get('/', provider_1.getProviders);
router.get('/search', provider_1.getSearchProvider);
// checkJwt,
router.get('/:id', provider_1.getProvider);
router.put('/:id', provider_1.updateProvider);
// checkJwt,
router.post('/', provider_1.postProvider);
router.delete('/:id', provider_1.deleteProvider);
//# sourceMappingURL=provider.js.map