import { Router, Request, Response } from "express";

const router = Router()

/**
 * http://localhost:3002/items [GET]
 */
 router.get('/blog', (req: Request, res: Response) => {
    res.send({data: "aqui van los modelos"})
});

export { router};