import { OperationBills as Operation, OperationBills } from "../interfaces/operation-bills.interface";
import OperationBillSchemaModel from "../models/operationBill";
import { Egress } from "../interfaces/egress.interface";
import EgressModel from "../models/egress";
import { paymentTypeHasEgress } from "../interfaces/payment-type-has-egress.interface";
import paymentTypeHasEgressModel from "../models/paymentTypeHasEgress";
import { RequestOperationBills } from "../interfaces/request-operation-bills.interface ";
import { ResponsePagination } from "../interfaces/response-pagination.interface";
import mongoose from "mongoose";



const insertOperationBills = async (operation: RequestOperationBills) => {
    // return operation; 
    const value = validPaidOperation(operation);
    if (value != "VALID_SUCCESS") {
        return value;
    }

    let dataFiles: any = [];
    // console.log('archivos', operation.files)
    if (Object.keys(operation.files as any).length > 0) {
        operation.files?.forEach(element => {
            // console.log('element',element)
            dataFiles.push({
                path:element.path as string,
                pathView: `${process.cwd()}/storage/${element.filename}`,
                filename: element.filename,
                size: element.size,
                mimetype:  element.mimetype
            })
        });
        operation.files = dataFiles
    }
    
    // return operation.files;
    // console.log('dataFiles', dataFiles)
    // return operation;
    // return operation;
    const responseInsert = await OperationBillSchemaModel.create(operation);
    // console.log('dresponseInsert', responseInsert)
    // return responseInsert;
    if (responseInsert._id != undefined) {
        const resultEgress = createEgress(responseInsert._id as string, operation);
        return resultEgress;
    }
    console.log('responseInsert operation bills', responseInsert)
    return responseInsert;
}

const validPaidOperation = (operation: RequestOperationBills): string => {
    if (operation?.amount as number  <=0 ) {
        return "NOT_FOUND_AMOUNT";
    }

    if (operation.egress == undefined || Object.entries(operation.egress).length == 0) {
        return "NOT_FOUND_DATA_EGRESS";
    }
    
    if (operation.egress.paymentHasEgress == undefined || Object.entries(operation.egress.paymentHasEgress).length == 0) {
        return "NOT_FOUND_DATA_PAYMENT_HAS_EGRESS";
    }
    
    let valueAmount: number = 0;
    valueAmount = operation.egress.paymentHasEgress.filter(d => parseInt(d.paymentAmount)).map(d => parseInt(d.paymentAmount)).reduce((a, b) => a  + b, 0);
    if (valueAmount !== operation.amount ) {
        return "AMOUNT_DISTINC_SUM_PAYMENT_EGRESS";
    }
    return "VALID_SUCCESS";
}

const createEgress = async (operationId: string, data: RequestOperationBills) => {

    const validEgress = await getEgress(operationId)
    // console.log('validEgress', validEgress)
    if (Object.keys(validEgress).length == 0) {
        console.log("ingreso se creara un abono")
        console.log("ingreso se creara un abono")
        console.log("ingreso se creara un abono")
        console.log("ingreso se creara un abono", data?.files)
        const dataEgress: Egress = {
            invoiceNumber: data.egress?.invoiceNumber,
            operationBills: operationId,
            description: data?.description,
            amount: data?.amount,
            files: data?.files
        }
        const responseInsertE = await EgressModel.create(dataEgress);
        // return responseInsertE;
        if (responseInsertE?._id != undefined) {
            let dataPayment: any = [];
            await data.egress?.paymentHasEgress?.forEach(
                (item: any) => {
                const dataPaymentTypeHasEgress: paymentTypeHasEgress = {
                    payments: item.payments,
                    egress: responseInsertE._id as string,
                    paymentAmount: item.paymentAmount,
                }
                dataPayment.push(dataPaymentTypeHasEgress)
            });
            const resulttype = await paymentTypeHasEgressModel.insertMany(dataPayment);
            // console.log('resulttype', resulttype)
        }
        return dataEgress; 
    }
    
      
}

const updateEgress = async (operationId: string, data: RequestOperationBills) => {
    console.log('valor', data)
    // return data;
    const validEgress = await getEgress(operationId)
    // console.log('validEgress', validEgress)
    if (Object.keys(validEgress).length == 0) {
        // console.log("ingreso se creara un abono")
        // console.log("ingreso se creara un abono")
        console.log("ingreso se creara un abono data?.dataFiles", data?.dataFiles)
        console.log("ingreso se creara un abono data?.files", data?.files)
       
        const dataEgress: Egress = {
            invoiceNumber: data.egress?.invoiceNumber,
            operationBills: operationId,
            description: data?.description,
            amount: data?.amount
        }
        
        let infoFile: any = [];
        if (Object.keys(data?.dataFiles as any).length > 0 && Object.keys(data?.files as any).length > 0) {
            // infoFile.push(data?.files);
            console.log('ingreso tiene datafiles y files')
            
            await data?.dataFiles?.forEach(element => {
                infoFile.push({
                    filename: element.filename,
                    path:element.path as string,
                    pathView: `${process.cwd()}/storage/${element.filename}`,
                    size: element.size,
                    mimetype:  element.mimetype
                });
                
            });

            await data?.files?.forEach(element => {
                infoFile.push({
                    filename: element.filename,
                    path:element.path as string,
                    pathView: `${process.cwd()}/storage/${element.filename}`,
                    size: element.size,
                    mimetype:  element.mimetype
                });
                
            });
            console.log('infoFiles', infoFile)

            // infoFile.push(data?.files as any);
            dataEgress.files = infoFile
            // console.log('infoFiles dataEgress', dataEgress)
        } else if(Object.keys(data?.files as any).length > 0){
            dataEgress.files = data.files;
        }else if(Object.keys(data?.dataFiles as any).length > 0){
            await data?.dataFiles?.forEach(element => {
                infoFile.push({
                    filename: element.filename,
                    path:element.path as string,
                    pathView: `${process.cwd()}/storage/${element.filename}`,
                    size: element.size,
                    mimetype:  element.mimetype
                });
                
            });
            dataEgress.files = infoFile
        }

        console.log("dataEgress", dataEgress)
        const responseInsertE = await EgressModel.findOneAndUpdate(
            {_id: data?.egress?._id },
            dataEgress,
            { new: true }
        );

        

        const deleteI = await paymentTypeHasEgressModel.deleteMany({egress: data?.egress?._id});
        // return deleteI;
        // const responseInsertE = await EgressModel.create(dataEgress);
        // return responseInsertE;
        if (Object.keys(data.egress?.paymentHasEgress as any).length > 0 ) {
            let dataPayment: any = [];
            await data.egress?.paymentHasEgress?.forEach(
                (item: any) => {
                const dataPaymentTypeHasEgress: paymentTypeHasEgress = {
                    payments: item.payments,
                    egress: data?.egress?._id as string,
                    paymentAmount: item.paymentAmount,
                }
                dataPayment.push(dataPaymentTypeHasEgress)
            });
            const resulttype = await paymentTypeHasEgressModel.insertMany(dataPayment);
            // console.log('resulttype', resulttype)
        }
        // return dataEgress; 
    }
    
      
}

const getEgress = async (orderId: string) => {

    const resp = await EgressModel.find({
        orders: orderId
        });
    
    return resp;    
}

const getOperationBills = async (query: any) => {
    let valid: any = {};
    const search = query.search || null;
    const page = parseInt(query.page, 10)  || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const startDate = query.startDate || '';
    const endDate = query.endDate || '';

    let response: ResponsePagination = {
        docs: [],
        totalDocs:  0,
        limit: limit,
        totalPages: 0,
        page: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: true,
        prevPage: null ,
        nextPage: 0 
    }
    
    if (search != null) {
        valid = {
            $text:{
                $search: `\"${search}\" authority key`
            },
        }
    }
    
    if (( startDate !== '' && endDate !== '') ) {
        const dataStartDate = startDate.split("/");
        const dataEndDate = endDate.split("/");
        var dateStr = new Date(dataStartDate[2], dataStartDate[0]-1,dataStartDate[1],0,0,0,0);
        var nextDate = new Date(dataEndDate[2],dataEndDate[0]-1,dataEndDate[1],23,59,59, 999);
        
        valid.createdAt = {
            $gte: dateStr, $lt: nextDate
        }
    }
    
    const responseItem = await OperationBillSchemaModel.aggregate([
        {  $match: valid },
        { $lookup: { from: 'egresses', localField: '_id', foreignField: 'operationBills', as: 'egress' } },
        {
          $setWindowFields: {
            output: { 
                totalDocs: { $count: {} },
            },
          },
        },
        { $skip: (page - 1) * limit || 0 },
        { $limit: Number(limit) },
    ]);

    if (Object.entries(responseItem).length > 0) {
        console.log('')
        response.docs = responseItem;
        response.totalDocs = responseItem[0].totalDocs;
        response.limit = limit;
        response.totalPages = Math.ceil( responseItem[0].totalDocs / limit );
        response.page = (page - 1) * limit || 0;
        response.prevPage = page;
        response.nextPage = (page + 1);
    }
    
    return response;
}

const getPaymentHasEgress = async (id:string) => {
    const responseItem = await paymentTypeHasEgressModel.find({egress: id})
    .populate('payments');
    
    return responseItem; 
}

const getOperationBill = async (id:string) => {
    // const responseItem = await OperationBillSchemaModel.findOne({_id:id});
    // return responseItem;

    let valid: any = {};
   
    let response: ResponsePagination = {
        docs: [],
        totalDocs:  0,
        limit: 1,
        totalPages: 0,
        page: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: true,
        prevPage: null ,
        nextPage: 0 
    }
    
    // valid = {
    //     $text:{
    //         $search: `\"${id}\" authority key`
    //     },
    // }
    try {
        // valid = {$eq: {_id:new mongoose.Types.ObjectId("63f7ebee0e2be4525a156238")}};
        const ObjectId = mongoose.Types.ObjectId;
        // 63ec10592073ceeccba8bf9e
        valid = { _id: new ObjectId(id)};
        // valid = {"_id":{$eq:new ObjectId("63f7ebee0e2be4525a156238")}}
        // valid = {type: 'cleaning_products'};
        console.log('llego por aca', valid)
        // await new mongoose.Types.ObjectId('6358403b25b29d9b3d42846c')
        
        const responseItem = await OperationBillSchemaModel.aggregate([
            { $match: valid },
            // {$match: { _id: new ObjectId("63f7ebee0e2be4525a156238") }},
            { $lookup: { from: 'egresses', localField: '_id', foreignField: 'operationBills', as: 'egress' } },
        ]);

         // const responseItem = await OperationBillSchemaModel.findOne({id}).populate('operationBills');
        // return responseItem;
        console.log('dataresponseItem',responseItem )
        if (Object.entries(responseItem as any).length > 0) {
            response.docs = responseItem as any;
        }
        
        return response;
    } catch (error) {
        console.log('error', error)
        
    }
}

const updateOperationBills = async (id:string, operation: RequestOperationBills) => {
    const value = validPaidOperation(operation);
    if (value != "VALID_SUCCESS") {
        return value;
    }
    // return operation;
    let dataFiles: any = [];
        if (Object.keys(operation.files as any).length > 0) {
        operation.files?.forEach(element => {
            // console.log('element',element)
            dataFiles.push({
                path:element.path as string,
                pathView: `${process.cwd()}/storage/${element.filename}`,
                filename: element.filename,
                size: element.size,
                mimetype:  element.mimetype
            })
        });
        operation.files = dataFiles
    }
    // return operation.dataFiles;
    // return operation.files;
    // console.log('dataFiles', dataFiles)
    // return operation;
    // return operation;
    // const responseInsert = await OperationBillSchemaModel.create(operation);
    const responseInsert = await OperationBillSchemaModel.findOneAndUpdate(
        {_id: id },
        operation,
        { new: true }
    );
    // console.log('actualizacion')
    // return responseInsert;
    // console.log('dresponseInsert', responseInsert)
    // return responseInsert;
    // if (responseInsert._id != undefined) {
        const resultEgress =  await updateEgress(id as string, operation);
        return resultEgress;
    // }
    return responseInsert;
}

const deleteOperationBills = async (id:string) => {
    const responseItem = await OperationBillSchemaModel.remove({_id:id});
    return responseItem;
}

export { insertOperationBills, getPaymentHasEgress,  getOperationBills, getOperationBill, updateOperationBills, deleteOperationBills };