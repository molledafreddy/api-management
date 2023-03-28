import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { RequestExt } from "../interfaces/request-ext.interface";
import { getOperationBill as operationBill, 
         getOperationBills as operationBills, 
         insertOperationBills, 
         updateOperationBills as updateOperation,
         deleteOperationBills as deleteOperationBill,
         getPaymentHasEgress as paymenthasEgress} from "../services/operationBill";
import { handleHttp } from "../utils/error.handle";
import data from '../middleware/file';
import { RequestOperationBills } from "../interfaces/request-operation-bills.interface ";
import { Egress } from "../interfaces/egress.interface";

const getOperationBills = async (req: RequestExt, res: Response) => {
  try {
      
      const query = req.query;
      const response = await operationBills(query);
      res.send(response);
  } catch (e) {
    console.log('error', e)
    handleHttp(res, "ERROR_GET_OPERATIONBILLS");
  }
};

const getOperationBill = async ({params}: RequestExt, res: Response) => {
  try {
        const {id} = params;
        const  responseItem = await operationBill(id);
        res.send(responseItem);
  } catch (e) {
    handleHttp(res, "ERROR_GET_OPERATIONBILLS");
  }
};

const getPaymentHasEgress = async ({params}: RequestExt, res: Response) => {
  try {
        const {id} = params;
        const  responseItem = await paymenthasEgress(id);
        res.send(responseItem);
  } catch (e) {
    handleHttp(res, "ERROR_GET_PAYMENTHASEGRESS", e);
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

const postOperationBills = async (req: RequestExt, res: Response) => {
  try {
      console.log('req', req)
        const { user, body, files } = req;
        body.users = `${user?._id}`;
        var valueOperation = JSON.parse(req.body.data)
        // res.send(body);
        // console.log('req.body', req.body.dataFiles)
        if (req.body.paymentHasEgress !== undefined) {
          var paymentHasEgress = JSON.parse(req.body.paymentHasEgress);
        }
        if (req.body.dataFiles !== undefined) {
          var dataFiles = JSON.parse(req.body.dataFiles);
        }
        // console.log('files', files);
        let now= new Date();
        const formatoMap = {
            dd: now.getDate(),
            mm: now.getMonth() + 1,
            yy: now.getFullYear().toString().slice(-2),
            yyyy: now.getFullYear()
        };

        let formatAmount = 0;
        if (valueOperation?.amount !== null && valueOperation?.amount !== undefined) {
          formatAmount = valueOperation?.amount.toString().replace(/[$.,]/g,'');
        }

        const egress: Egress = {
          _id: valueOperation._idEgress,
          invoiceNumber: valueOperation.invoiceNumber,
          amount: formatAmount,
          description: valueOperation.description,
          paymentHasEgress: paymentHasEgress,
          type: 'operationBills',
          paymentDate: new Date(formatoMap.yyyy,formatoMap.mm-1,formatoMap.dd,12,0,0)
        }
    
        const reqOperation: RequestOperationBills = {
          id: body?.id,
          description: valueOperation.description,
          amount: formatAmount,
          egress: egress,
          users: user?._id,
          type: valueOperation.type,
          files: files as any,
          dataFiles: dataFiles as any,
        }
        // res.send(reqOperation);
        if (!valueOperation._id) {
          // console.log('llego al post')
          const  responseOrder = await insertOperationBills(reqOperation);
          res.send(responseOrder);
        } else {
          console.log('llego al update')
          const response = await updateOperation(valueOperation._id, reqOperation);
          res.send(response);
        }
       
  } catch (e) {
      handleHttp(res, "ERROR_POST_OPERATIONBILLS", e)
  }
}

const updateOperationBills = async (req: RequestExt, res: Response) => {
  try {
    const { user, body, params, files } = req;
    console.log('llego por aca body',req.body)
      const {id} = params;
      const response = await updateOperation(id, body);
      res.send(response);
  } catch (e) {
      handleHttp(res, "ERROR_UPDATE_OPERATIONBILLS")
  }
}

const deleteOperationBills = async ({params}: Request, res: Response) => {
  try {
      const {id} = params;
      const response = await deleteOperationBill(id);
      res.send(response);
  } catch (e) {
      handleHttp(res, "ERROR_DELETE_OPERATIONBILLS")
  }
}

export { getOperationBills, getPaymentHasEgress, getOperationBill, postOperationBills, updateOperationBills,  deleteOperationBills};


