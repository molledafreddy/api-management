import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Egress } from "../interfaces/egress.interface";
import { RequestExt } from "../interfaces/request-ext.interface";
import { 
          insertOrUpdateOrder, 
          validOrderProvider, 
          getOrderDetail as orderDetail, 
          getOrder as order, 
          getOrders as orders,
          searchEgress as getSearchEgress,
          searchOrderPaitOut as orderPaitOut} from "../services/egress";
import { handleHttp } from "../utils/error.handle";
import { RequestOrder } from "../interfaces/request-order.interface";

const getOrders = async (req: RequestExt, res: Response) => {
  try {
      // console.log('llego por aca');
      const response = await orders();
      res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR_GET_ORDERS");
  }
};

const getOrder = async ({params}: RequestExt, res: Response) => {
  try {
        const {id} = params;
        const  responseItem = await order(id);
        res.send(responseItem);
  } catch (e) {
    handleHttp(res, "ERROR_GET_ORDERS");
  }
};

const getOrderDetail = async ({params}: RequestExt, res: Response) => {
  try {
    console.log('llego al getOrderDetail')
        const {id} = params;
        const  responseItem = await orderDetail(id);
        res.send(responseItem);
  } catch (e) {
    handleHttp(res, "ERROR_GET_ORDERS");
  }
};

const searchOrderPaitOut = async (req: RequestExt, res: Response) => {
  try {
    // console.log('llego al searchDetail',body.date[0].estimateReceptionDate)
        // const {id} = params;
        const query = req.query;
        // console.log('searchOrderPaitOut', query)
        // res.send(query);
        const  responseItem = await orderPaitOut(query);
        // console.log('responseItem', responseItem)
        res.send(responseItem);
  } catch (e) {
    console.log('e', e)
    handleHttp(res, "ERROR_GET__SEARCH_ORDERS");
  }
};

const searchEgress = async ({body}: RequestExt, res: Response) => {
  try {
    console.log('llego al searchDetail', body)
        // const {id} = params;
        // res.send(body);
        const  responseItem = await getSearchEgress(body);
        // console.log('responseItem', responseItem)
        res.send(responseItem);
  } catch (e) {
    console.log('e', e)
    handleHttp(res, "ERROR_GET__SEARCH_ORDERS");
  }
};

const consultStatusOrder = async ({params}: RequestExt, res: Response) => {
  try {
        const {id} = params;
        const  responseItem = await validOrderProvider(id);
        res.send(responseItem);
  } catch (e) {
    handleHttp(res, "ERROR_GET_ORDERS");
  }
};

const postOrder = async (req: RequestExt, res: Response) => {
  // try {
  //   const { user, body, files } = req;
  //     body.users = `${user?._id}`;
      
  //     var valueOrder = JSON.parse(req.body.data)
  //     // console.log('valueOrder', valueOrder)
  //     let paymentHasEgress = [];
  //     if (req.body.paymentHasEgress !== undefined) {
  //       paymentHasEgress = JSON.parse(req.body.paymentHasEgress);
  //     }
  //     let dataFiles = [];
  //     if (req.body.dataFiles !== undefined) {
  //       dataFiles = JSON.parse(req.body.dataFiles);
  //     }
  //     let formatAmount = 0;
  //     // console.log('valueOrder.amount', valueOrder)
  //     if (valueOrder?.amount !== null && valueOrder?.amount !== undefined) {
        
  //       var monto = "$ 178.000";
  //       formatAmount = valueOrder?.amount.replace(/[$.]/g,'');
  //     }
  //     // console.log('formatAmount',formatAmount)
  //       // return valueOrder;
  //     const egress: Egress = {
  //       _id: valueOrder?._idEgress,
  //       // _id: "",
  //       invoiceNumber: valueOrder?.invoiceNumber,
  //       amount:formatAmount,
  //       description: valueOrder?.descriptionPayment,
  //       paymentHasEgress: paymentHasEgress as any
  //     }
  //     // console.log('datos egress', egress)
  //     const requestO: RequestOrder = {
  //       _id: valueOrder?._id,
  //       paymentDate: valueOrder?.paymentDate,
  //       receptionDate: valueOrder?.receptionDate,
  //       EstimateReceptionDate: valueOrder?.estimateReceptionDate,
  //       creditPaymentDate: valueOrder?.creditPaymentDate,
  //       amountPaid: formatAmount,
  //       invoiceNumber: valueOrder?.invoiceNumber,
  //       orderDate: valueOrder?.orderDate,
  //       descriptionOrder: valueOrder?.descriptionOrder,
  //       descriptionPayment: valueOrder?.descriptionPayment,
  //       descriptionLogistic: valueOrder?.descriptionLogistic,
  //       status: valueOrder?.status,
  //       estimatedAmount: valueOrder?.estimatedAmount,
  //       providers: valueOrder?.providers,
  //       paymentMethod: valueOrder?.paymentMethod,
  //       files: files as any,
  //       dataFiles: dataFiles as any,
  //       egress: egress,
  //       users: user,
  //     }
  //     // console.log('requestO', requestO)
  //     // res.send(body);
  //     // return {body};
  //     // res.send(requestO);
  //     const  responseOrder = await insertOrUpdateOrder(requestO);
  //     res.send(responseOrder);
  // } catch (e) {
  //     handleHttp(res, "ERROR_POST_ORDERS", e)
  // }
}

export { getOrders, getOrder, getOrderDetail, searchOrderPaitOut, searchEgress, postOrder, consultStatusOrder };


