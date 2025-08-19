"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
/**
 * http://localhost:3002/items [GET]
 */
router.get('/blog', (req, res) => {
    res.send({ data: "aqui van los modelos" });
});
//# sourceMappingURL=blogs.js.map