import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { RequestExt } from "../interfaces/request-ext.interface";
import { getAccount as account, getAccounts as accounts, insertAccount, updateAccount as updateA, deleteAccount as deleteA } from "../services/account";
import { handleHttp } from "../utils/error.handle";

const getAccount = async ({params}: Request, res: Response) => {
  try {
      const {id} = params;
      const response = await account(id);
      const data = response ? response : "NOT_FOUND";
      res.send(data);
  } catch (e) {
      handleHttp(res, "ERROR_GET_ACCOUNT")
  }
}

const getAccounts = async (req: RequestExt, res: Response) => {
  try {
    // console.log('getAccounts', req.query)
    const query = req.query;
    const response = await accounts(query);
    res.send(response);
} catch (e) {
  console.log('error', e)
    handleHttp(res, "ERROR_GET_ACCOUNTS")
}
  
};

const postAccount = async (req: RequestExt, res: Response) => {
  try {
      const { user, body } = req;
      body.users = `${user?._id}`;
      const  responseOrder = await insertAccount(body);
      res.send(responseOrder);
  } catch (e) {
      handleHttp(res, "ERROR_POST_ACCOUNTS", e)
  }
}

const updateAccount = async ({params, body}: Request, res: Response) => {
  try {
      const {id} = params;
      const response = await updateA(id, body);
      res.send(response);
  } catch (e) {
      handleHttp(res, "ERROR_UPDATE_ACCOUNTS")
  }
}

const deleteAccount = async ({params}: Request, res: Response) => {
  try {
      const {id} = params;
      const response = await deleteA(id);
      res.send(response);
  } catch (e) {
      handleHttp(res, "ERROR_DELETE_ITEMS")
  }
}

export { getAccounts, getAccount, postAccount, updateAccount, deleteAccount };