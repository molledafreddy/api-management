import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { RequestExt } from "../interfaces/request-ext.interface";
import { handleHttp } from "../utils/error.handle";
import { getSearchUserNumber } from "../services/user";


const getUsersNumber = async (req: RequestExt, res: Response) => {
  try {
    console.log('llego aca')
    const query = req.query;
    const response = await getSearchUserNumber(query);
    res.send(response);
} catch (e) {
  console.log('error', e)
    handleHttp(res, "ERROR_GET_USER")
}
};

export { getUsersNumber };