import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { RequestExt } from "../interfaces/request-ext.interface";
import { RequestRevenueWorkingDay } from "../interfaces/request-revenue-working-day.interface";
import { getRevenue as revenue, 
         getRevenues as revenues, 
         insertOrUpdateRevenueWorkingDay, 
         insertOrUpdateRevenueOther, 
         getRevenueOther as revenueOther,
         getRevenueTurn as revenueTurn } from "../services/revenue";
import { handleHttp } from "../utils/error.handle";
import { Revenue } from "../interfaces/revenue.interface";

const getRevenues = async (req: RequestExt, res: Response) => {
  try {
      // console.log('llego por aca');
      const query = req.query;
      const response = await revenues();
      res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR_GET_REVENUES");
  }
};

const getRevenue = async ({params}: RequestExt, res: Response) => {
  try {
        const {id} = params;
        // console.log('parametros getRevenue');
        const  responseItem = await revenue(id);
        // console.log('getRevenue', responseItem)
        res.send(responseItem);
  } catch (e) {
    handleHttp(res, "ERROR_GET_REVENUE");
  }
};

const getRevenueTurn = async (req: RequestExt, res: Response) => {
  try {
        // console.log('reqssss getRevenueTurn', req)
        const { user, body, query } = req;
        // const query = req.query;
        query.users = `${user?._id}`;
        // return body;
        // console.log('query', query)
        // res.send(query);
        const  responseItem = await revenueTurn(query);
        res.send(responseItem);
  } catch (e) {
    handleHttp(res, "ERROR_GET_REVENUEsss", e);
  }
};

const getRevenueOther = async (req: RequestExt, res: Response) => {
  try {
        // console.log('reqssss getRevenueTurn', req)
        const { user, body, query } = req;
        // const query = req.query;
        query.users = `${user?._id}`;
        // return body;
        // console.log('query', query)
        // res.send(query);
        const  responseItem = await revenueOther(query);
        res.send(responseItem);
  } catch (e) {
    handleHttp(res, "ERROR_GET_REVENUEsss", e);
  }
};

// const searchOrderDetail = async ({body}: RequestExt, res: Response) => {
//   try {
//     console.log('llego al searchDetail')
//         // const {id} = params;
//         const  responseItem = await searchDetail(body);
//         console.log('responseItem', responseItem)
//         res.send(responseItem);
//   } catch (e) {
//     handleHttp(res, "ERROR_GET_ORDERS");
//   }
// };

const postRevenueWorkingDay = async (req: RequestExt, res: Response) => {
  try {
      const { user, body, files } = req;
      // res.send(req.body);
      var valueRevenue = JSON.parse(req.body.data.toString());
      valueRevenue.users = user?._id;
      // var detailRevenue = JSON.parse(req.body.detailRevenue.toString());
      let dataFiles = [];
      if (req.body.dataFiles !== undefined) {
        dataFiles = JSON.parse(req.body.dataFiles);
      }

      let formattotalAmount = 0;
      console.log('valueOrder.amount', valueRevenue)
      // console.log('valueRevenue?.totalAmount', valueRevenue?.totalAmount)
      // res.send(valueRevenue);
      if (valueRevenue?.totalAmount !== null && valueRevenue?.totalAmount !== undefined) {
        valueRevenue.totalAmount = Number(valueRevenue?.totalAmount.toString().replace(/[$,]/g,'')) ;
      }
      // valueRevenue
      // const revenue: Revenue = {
      //   amountTransfer?: number;
      //   amountPos?: number;
      //   amountCash?: number;
      //   amountOther?: number;
      //   amountSistem?: number;
      //   description?: String;
      //   turn?: String;
      //   cashFund?: number;
      //   amountTurn: number;
      //   totalAmount: number;
      //   users?: string;
      //   workingDay?: string;
      //   files?: any;
      //   type: 'other' | 'closing';
      // }
      valueRevenue.type = 'closure';
      const reqRevenue: RequestRevenueWorkingDay = {
        id: valueRevenue._id,
        // detailRevenue:detailRevenue,
        revenue: valueRevenue,
        users: user?._id,
        dataFiles: dataFiles as any,
        files: files as any,
        type: valueRevenue.type
      }
      // res.send(reqRevenue);
      const  responseOrder = await insertOrUpdateRevenueWorkingDay(reqRevenue);
      res.send(responseOrder);
  } catch (e) {
      handleHttp(res, "ERROR_POST_POSTREVENUEWORKINGDAY", e)
  }
}

const postRevenueOther = async (req: RequestExt, res: Response) => {
    try {
      console.log('llegoi por aca')
      const { user, body, files } = req;
      var valueRevenue = JSON.parse(req.body.data.toString());
      valueRevenue.users = user?._id;
      // res.send(body);
      // var detailRevenue = JSON.parse(req.body.detailRevenue.toString());
      if (valueRevenue?.totalAmount !== null && valueRevenue?.totalAmount !== undefined) {
        valueRevenue.totalAmount = Number(valueRevenue?.totalAmount.toString().replace(/[$,]/g,'')) ;
      }
      let dataFiles = [];
      if (req.body.dataFiles !== undefined) {
        dataFiles = JSON.parse(req.body.dataFiles);
      }
  
      const reqRevenue: RequestRevenueWorkingDay = {
        id: valueRevenue._id,
        // detailRevenue:detailRevenue,
        revenue: valueRevenue,
        users: user?._id,
        dataFiles: dataFiles as any,
        files: files as any,
        type: 'other'
      }
      const  responseOrder = await insertOrUpdateRevenueOther(reqRevenue);
      res.send(responseOrder);
  } catch (e) {
      handleHttp(res, "ERROR_POST_POSTREVENUEOTHER", e)
  }
}



// const updateRevenueWorkingDay = async ({params, body}: Request, res: Response) => {
//   try {
//       const {id} = params;
//       const response = await updateOperation(id, body);
//       res.send(response);
//   } catch (e) {
//       handleHttp(res, "ERROR_UPDATE_OPERATIONBILLS")
//   }
// }

// const deleteOperationBills = async ({params}: Request, res: Response) => {
//   try {
//       const {id} = params;
//       const response = await deleteOperationBill(id);
//       res.send(response);
//   } catch (e) {
//       handleHttp(res, "ERROR_DELETE_OPERATIONBILLS")
//   }
// }
// , updateOperationBills,  deleteOperationBills
export { getRevenues, getRevenue, postRevenueWorkingDay, getRevenueTurn, getRevenueOther, postRevenueOther};


