import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { RequestExt } from "../interfaces/request-ext.interface";
import { getBank as bank, getBanks as banks, insertBank, updateBank as updateA, deleteBank as deleteA } from "../services/bank";
import { handleHttp } from "../utils/error.handle";

const getBank = async ({params}: Request, res: Response) => {
  try {
      const {id} = params;
      const response = await bank(id);
      const data = response ? response : "NOT_FOUND";
      res.send(data);
  } catch (e) {
      handleHttp(res, "ERROR_GET_BANK")
  }
}

const getBanks = async (req: RequestExt, res: Response) => {
  try {
    const response = await banks();
    res.send(response);
} catch (e) {
    handleHttp(res, "ERROR_GET_BANKS")
}
  
};

const postBank = async (req: RequestExt, res: Response) => {
  try {
    const { user, body } = req;
    body.users = `${user?._id}`;
      const  responseOrder = await insertBank(body);
      res.send(responseOrder);
  } catch (e) {
      handleHttp(res, "ERROR_POST_BANKS", e)
  }
}

const updateBank = async ({params, body}: Request, res: Response) => {
  try {
      const {id} = params;
      const response = await updateA(id, body);
      res.send(response);
  } catch (e) {
      handleHttp(res, "ERROR_UPDATE_BANKS")
  }
}

const deleteBank = async ({params}: Request, res: Response) => {
  try {
      const {id} = params;
      const response = await deleteA(id);
      res.send(response);
  } catch (e) {
      handleHttp(res, "ERROR_DELETE_BANKS")
  }
}

export { getBanks, getBank, postBank, updateBank, deleteBank };