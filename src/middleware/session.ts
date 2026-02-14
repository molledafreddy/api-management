import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { RequestExt } from "../interfaces/request-ext.interface";
import { verifyToken } from "../utils/jwt.handle";



const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
    try {
        const jwtUser = req.headers.authorization || null;
        const jwt = jwtUser?.split(' ').pop() // ['Bearer','11111']
         const isUser = verifyToken(`${jwt}`) as { _id: string, role: string};
        
         if (!isUser) {
            return res.status(401).json({ 
                error: "SESSION_NO_VALIDA",
                message: "Token inválido o expirado"
            });
         } else {
            //  console.log('checkJwt llego aca',isUser._id)
            req.user = isUser;
            next();
         }
        // console.log({jwt})
        // next();
    } catch (e) {
        console.log({e})
        return res.status(401).json({ 
            error: "SESSION_NO_VALIDA",
            message: "Error en autenticación"
        });
    }

}

export { checkJwt};