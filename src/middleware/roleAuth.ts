import { NextFunction, Request, Response } from "express";
// import { JwtPayload } from "jsonwebtoken";
// import { RequestExt } from "../interfaces/request-ext.interface";
import { verifyToken } from "../utils/jwt.handle";
import userModel from "../models/user"


const checkRoleAuth = (roles: string[] ) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const jwtUser = req.headers.authorization || null;
        const jwt = jwtUser?.split(' ').pop() // ['Bearer','11111']
        //  const isUser = verifyToken(`${jwt}`) as { id: string};
        const tokenData = await verifyToken(`${jwt}`) as { _id: string, role: string};
        const userData = await userModel.findById(tokenData._id);
        if ( roles.findIndex(value => value === userData?.role) != -1) {
            console.log('ingreso tienes permisos')
            next();
        } else {
            console.log('paso de largo')
            res.status(409);
            res.send({ error: 'No tienes permisos' })
        }

        //  console.log(isUser)
        //  if (!userData) {
        //     res.status(401);
        //     res.status(401);
        //  } else {
        //     req.user = userData;
        //     next();
        //  }
        // console.log({jwt})
        // next();
    } catch (e) {
        console.log({e})
        res.status(400);
        res.send(["SESSION_NO_VALIDA"])
    }

}

export { checkRoleAuth};




// const { handleHttpError } = require("../utils/handleError");
// /**
//  * Array con los roles permitidos
//  * @param {*} rol
//  * @returns
//  */
// const checkRol = (roles) => (req, res, next) => {
//   try {
//     const { user } = req;
//     const rolesByUser = user.role; //TODO ["user"]
//     //TODO: ["admin","manager"]
//     const checkValueRol = roles.some((rolSingle) =>
//       rolesByUser.includes(rolSingle)
//     ); //TODO: true, false
//     if (!checkValueRol) {
//       handleHttpError(res, "USER_NOT_PERMISSIONS", 403);
//       return;
//     }
//     next();
//   } catch (e) {
//     handleHttpError(res, "ERROR_PERMISSIONS", 403);
//   }
// };

// module.exports = checkRol;