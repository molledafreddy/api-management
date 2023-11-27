import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { RequestExt } from "../interfaces/request-ext.interface";
import { getAccount as account, getAccounts as accounts, insertAccount, updateAccount as updateA, deleteAccount as deleteA } from "../services/account";
import { handleHttp } from "../utils/error.handle";
import { getSearchProductDelivery as searchProductDelivery, getProductHasDelivery as productHasDelivery, getProductDeliveryId as productDeliveryId, updateProductDelivery, insertProductDelivery, getProducts as products } from "../services/productDelivery";
import { RequestDeliveryOrder } from "../interfaces/request-delivery-order.interface";


const getSearchProductDelivery = async (req: Request, res: Response) => {
  try {
    console.log('req', req.query)
      const query = req.query;
      const response = await searchProductDelivery(query);
      res.send(response);
  } catch (e) {
      console.log('error', e)
      handleHttp(res, "ERROR_GET_SEARCH_PRODUCT_DELIVERY")
  }
}

const getProductDeliveryId = async ({params}: Request, res: Response) => {
  try {
      const {id} = params;
      // const query = req.query;
      console.log('getProductDeliveryId', id)
      const response = await productDeliveryId(id);
      const data = response ? response : "NOT_FOUND";
      res.send(data);
  } catch (e) {
      handleHttp(res, "ERROR_GET_PRODUCT_DELIVERY_ID")
  }
}

const getProductHasDelivery = async ({params}: RequestExt, res: Response) => {
  try {
        const {id} = params;
        const  responseItem = await productHasDelivery(id);
        res.send(responseItem);
  } catch (e) {
    handleHttp(res, "ERROR_GET_PAYMENTHASEGRESS", e);
  }
};

const getProducts = async ({params}: Request, res: Response) => {
  try {
      const {idCategory, clasification, status} = params;
      // const query = req.query;
      console.log('getProducts idCategory', idCategory, clasification, status)
      // const response = await products(idCategory, clasification, status);
      // const data = response ? response : "NOT_FOUND";
      // res.send(data);
  } catch (e) {
      handleHttp(res, "ERROR_GET_PROCUTS")
  }
}


// const postProduct = async (req: RequestExt, res: Response) => {
//   try {
//       const { user, body } = req;
//       body.users = `${user?._id}`;
//       console.log('body', body)
//       const  responseCateogry = await insertProduct(body);
//       res.send(responseCateogry);
//   } catch (e) {
//     console.log('e', e)
//       handleHttp(res, "ERROR_POST_PRODUCT", e)
//   }
// }

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

const putProductDelivery = async ({params, body}: Request, res: Response) => {
  try {
      const {id} = params;
      console.log('datos putProductDelivery', body)
      const response = await updateProductDelivery(id, body);
      res.send(response);
  } catch (e) {
    console.log('error', e)
      handleHttp(res, "ERROR_UPDATE_PRODUCT-DELIVERY")
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

export { getSearchProductDelivery, getProductHasDelivery, putProductDelivery, getProductDeliveryId, postProductDelivery, getProducts };