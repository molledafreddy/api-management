import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { RequestExt } from "../interfaces/request-ext.interface";
import { getAccount as account, getAccounts as accounts, insertAccount, updateAccount as updateA, deleteAccount as deleteA } from "../services/account";
import { handleHttp } from "../utils/error.handle";
import { getCategoryProducts, getProductId as productId, updateProduct, getAllCategoryProducts, insertCategory, getSearchProduct as searchProduct, insertProductDelivery, getProducts as products, insertProduct } from "../services/products";
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

const getAllCategory = async (req: RequestExt, res: Response) => {
  try {
      console.log('datos getCategory')
      // const {id} = params;
      const response = await getAllCategoryProducts();
      const data = response ? response : "NOT_FOUND";
      res.send(data);
  } catch (e) {
    console.log('e', e)
      handleHttp(res, "ERROR_GET_CATEGORY_ALL")
  }
}

const getSearchProduct = async (req: Request, res: Response) => {
  try {
    console.log('req', req.query)
      const query = req.query;
      const response = await searchProduct(query);
      res.send(response);
  } catch (e) {
      console.log('error', e)
      handleHttp(res, "ERROR_GET_SEARCH_PROVIDERS")
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

const getProductId = async ({params}: Request, res: Response) => {
  try {
      const {id} = params;
      // const query = req.query;
      console.log('getProducts idCategory', id)
      const response = await productId(id);
      // const data = response ? response : "NOT_FOUND";
      // res.send(data);
  } catch (e) {
      handleHttp(res, "ERROR_GET_PROCUT_ID")
  }
}

const getProducts = async ({params}: Request, res: Response) => {
  try {
      const {idCategory, clasification, status} = params;
      // const query = req.query;
      console.log('getProducts llegoooo idCategory', idCategory, clasification, status)
      const response = await products(idCategory, clasification, status);
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

// const putProduct = async (req: RequestExt, res: Response) => {
//   try {
//       const { user, body } = req;
//       body.users = `${user?._id}`;
//       console.log('body', body)
//       const  responseCateogry = await updateProduct(body);
//       res.send(responseCateogry);
//   } catch (e) {
//     console.log('e', e)
//       handleHttp(res, "ERROR_POST_PRODUCT", e)
//   }
// }

const putProduct = async ({params, body}: Request, res: Response) => {
  try {
      const {id} = params;
      const response = await updateProduct(id, body);
      res.send(response);
  } catch (e) {
      handleHttp(res, "ERROR_UPDATE_ACCOUNTS")
  }
}

const postProductDelivery = async (req: RequestExt, res: Response) => {
  try {
      const { body } = req;
      // body.users = `${user?._id}`;
      // console.log('body', body)
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

export { getCategory, putProduct, getProductId, getAllCategory, getSearchProduct, postCategory, postProductDelivery, getProducts, postProduct };