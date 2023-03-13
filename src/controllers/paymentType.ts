import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { RequestExt } from "../interfaces/request-ext.interface";
import { getPaymentType as paymentType, getPaymentTypes as accounts, insertPaymentType, updatePaymentType as updateA, deletePaymentType as deleteA } from "../services/paymentType";
import { handleHttp } from "../utils/error.handle";

const getPaymentType = async ({params}: Request, res: Response) => {
  try {
      const {id} = params;
      const response = await paymentType(id);
      const data = response ? response : "NOT_FOUND";
      res.send(data);
  } catch (e) {
      handleHttp(res, "ERROR_GET_PAYMENTTYPE")
  }
}

const getPaymentTypes = async (req: RequestExt, res: Response) => {
  try {
    const response = await accounts();
    res.send(response);
} catch (e) {
    handleHttp(res, "ERROR_GET_PAYMENTTYPES")
}
  
};

const postPaymentType = async (req: RequestExt, res: Response) => {
  try {
      const { user, body } = req;
      body.users = `${user?._id}`;
      const  responseOrder = await insertPaymentType(body);
      res.send(responseOrder);
  } catch (e) {
      handleHttp(res, "ERROR_POST_PAYMENTTYPES", e)
  }
}

const updatePaymentType = async ({params, body}: Request, res: Response) => {
  try {
      const {id} = params;
      const response = await updateA(id, body);
      res.send(response);
  } catch (e) {
      handleHttp(res, "ERROR_UPDATE_PAYMENTTYPES")
  }
}

const deletePaymentType = async ({params}: Request, res: Response) => {
  try {
      const {id} = params;
      const response = await deleteA(id);
      res.send(response);
  } catch (e) {
      handleHttp(res, "ERROR_DELETE_PAYMENTTYPES")
  }
}

export { getPaymentTypes, getPaymentType, postPaymentType, updatePaymentType, deletePaymentType };