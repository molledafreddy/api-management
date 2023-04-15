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
          searchOrderDetail as searchDetail,
          searchOrderPaitOut as orderPaitOut} from "../services/order";
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

const searchOrderDetail = async ({body}: RequestExt, res: Response) => {
  try {
    // console.log('llego al searchDetail',body.date[0].estimateReceptionDate)
        // const {id} = params;
        const  responseItem = await searchDetail(body);
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
  try {
    const { user, body, files } = req;
      body.users = `${user?._id}`;
      console.log('user',  req.body)
      var valueOrder = JSON.parse(req.body.data)
      // console.log('fireq.body.paymentHasEgressles', req.body.paymentHasEgress)
      // res.send(req.body);
      let paymentHasEgress = [];
      if (req.body.paymentHasEgress !== 'undefined') {
        paymentHasEgress = JSON.parse(req.body.paymentHasEgress);
      }

      // console.log('paymentHasEgress', paymentHasEgress)
      // res.send(req.body);
      let dataFiles = [];
      if (req.body.dataFiles !== undefined) {
        dataFiles = JSON.parse(req.body.dataFiles);
      }
      let formatEstimatedAmount = 0;
      // console.log('valueOrder.amount', valueOrder)
      // res.send(valueOrder);
      if (valueOrder?.estimatedAmount !== null && valueOrder?.estimatedAmount !== undefined) {
        formatEstimatedAmount = valueOrder?.estimatedAmount.toString().replace(/[$,]/g,'');
      }
      // console.log('formatAmount',formatEstimatedAmount)
        // return valueOrder;
      const egress: Egress = {
        _id: valueOrder?._idEgress,
        paymentDate: valueOrder?.paymentDate,
        invoiceNumber: valueOrder?.invoiceNumber,
        amount:valueOrder?.amount,
        description: valueOrder?.descriptionPayment,
        paymentHasEgress: paymentHasEgress as any,
        type: 'orders',
      }
      // console.log('datos egress', egress)
      const requestO: RequestOrder = {
        _id: valueOrder?._id,
        paymentDate: valueOrder?.paymentDate,
        receptionDate: valueOrder?.receptionDate,
        EstimateReceptionDate: valueOrder?.estimateReceptionDate,
        creditPaymentDate: valueOrder?.creditPaymentDate,
        amountPaid: valueOrder?.amount,
        invoiceNumber: valueOrder?.invoiceNumber,
        orderDate: valueOrder?.orderDate,
        descriptionOrder: valueOrder?.descriptionOrder,
        descriptionPayment: valueOrder?.descriptionPayment,
        descriptionLogistic: valueOrder?.descriptionLogistic,
        status: valueOrder?.status,
        estimatedAmount: formatEstimatedAmount,
        providers: valueOrder?.providers,
        paymentMethod: valueOrder?.paymentMethod,
        files: files as any,
        dataFiles: dataFiles as any,
        egress: egress,
        users: user,
        type: 'orders',
      }
      // console.log('requestO', requestO)
      // res.send(body);
      // return {body};
      // res.send(egress);
      const  responseOrder = await insertOrUpdateOrder(requestO);
      res.send(responseOrder);
  } catch (e) {
    console.log('error', e)
      handleHttp(res, "ERROR_POST_ORDERS", e)
  }
}

export { getOrders, getOrder, getOrderDetail, searchOrderPaitOut, searchOrderDetail, postOrder, consultStatusOrder };


