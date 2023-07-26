import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { RequestExt } from "../interfaces/request-ext.interface";
import { getAccount as account, getAccounts as accounts, insertAccount, updateAccount as updateA, deleteAccount as deleteA } from "../services/account";
import { handleHttp } from "../utils/error.handle";
import { getCategoryProducts, insertCategory, insertProductDelivery, getProducts as products, insertProduct } from "../services/products";
import { RequestDeliveryOrder } from "../interfaces/request-delivery-order.interface";

const getCategory = async (req: RequestExt, res: Response) => {
  try {
      console.log('datos getCategory')
      // const {id} = params;
      const response = await getCategoryProducts();
      const data = response ? response : "NOT_FOUND";
      res.send(data);
  } catch (e) {
    console.log('e', e)
      handleHttp(res, "ERROR_GET_CATEGORY_ALL")
  }
}

const postCategory = async (req: RequestExt, res: Response) => {
  try {
      const { user, body } = req;
      body.users = `${user?._id}`;
      console.log('body', body)
      const  responseCateogry = await insertCategory(body);
      res.send(responseCateogry);
  } catch (e) {
    console.log('e', e)
      handleHttp(res, "ERROR_POST_category_products", e)
  }
}

const getProducts = async ({params}: Request, res: Response) => {
  try {
      const {idCategory, clasification} = params;
      // const query = req.query;
      console.log('getProducts idCategory', idCategory, clasification)
      const response = await products(idCategory, clasification);
      const data = response ? response : "NOT_FOUND";
      res.send(data);
  } catch (e) {
      handleHttp(res, "ERROR_GET_PROCUTS")
  }
}


const postProduct = async (req: RequestExt, res: Response) => {
  try {
      const { user, body } = req;
      body.users = `${user?._id}`;
      console.log('body', body)
      const  responseCateogry = await insertProduct(body);
      res.send(responseCateogry);
  } catch (e) {
    console.log('e', e)
      handleHttp(res, "ERROR_POST_PRODUCT", e)
  }
}

const postProductDelivery = async (req: RequestExt, res: Response) => {
  try {
      const { body } = req;
      // body.users = `${user?._id}`;
      
      const deliveryOrder: RequestDeliveryOrder = {
        nameClient: body?.nameClient,
        phone: body?.phone,
        address: body?.address,
        products:  body?.products
      }
      const  responseProductDelivery = await insertProductDelivery(deliveryOrder);
      res.send(responseProductDelivery);
  } catch (e) {
    console.log('e', e)
      handleHttp(res, "ERROR_POST_PRODUCT_DELIVERY", e)
  }
}

const getAccount = async (req: RequestExt, res: Response) => {
  try {
      // const {id} = params;
      const response = await getCategoryProducts();
      const data = response ? response : "NOT_FOUND";
      res.send(data);
  } catch (e) {
      handleHttp(res, "ERROR_GET_CATEGORY_PRODUCTS")
  }
}

const getAccounts = async (req: RequestExt, res: Response) => {
  try {
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
      console.log('body', body)
      const  responseOrder = await insertAccount(body);
      res.send(responseOrder);
  } catch (e) {
    console.log('e', e)
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

export { getCategory, postCategory, postProductDelivery, getProducts, postProduct, getAccounts, getAccount, postAccount, updateAccount, deleteAccount };