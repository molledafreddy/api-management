import { Revenue } from "../interfaces/revenue.interface";
import { RequestRevenueWorkingDay } from "../interfaces/request-revenue-working-day.interface";
import RevenueModel from "../models/revenue";
import { DetailRevenue } from "../interfaces/detail-revenue.interface";
import { validTurn } from "./turn";
import mongoose from "mongoose";
import { RequestFiles } from "../interfaces/request-files.interface";
import { ResponsePagination } from "../interfaces/response-pagination.interface";
import { getWorkingForDate, insertWorkingDay } from "./workingDay";
import { ResponseError } from "../interfaces/response-error.interface";

const insertOrUpdateRevenueWorkingDay = async (revenue: RequestRevenueWorkingDay) => {
    const value: any = validPaidRevenue(revenue);
    if (value != "VALID_SUCCESS") {
        const resError: ResponseError = {
            codeHttp: '400',
            code: value,
            message: 'Error, debe verificar los montos enviados.'
        } 
        return resError;
    
    }

    let dataF: any = [];
    if (Object.keys(revenue.files as any).length > 0) {
            revenue.files?.forEach(element => {
            dataF.push({
                path:element.path as string,
                pathView: `${process.cwd()}/storage/${element.filename}`,
                filename: element.filename,
                size: element.size,
                mimetype:  element.mimetype
            })
        });
        revenue.files = dataF
        revenue.revenue.files = dataF
    }

    if ( revenue.id ) {

        const resultUpdate = await updateRevenue(revenue.id as string, revenue);
        return resultUpdate;
    } else {
        const validTurnR = await validTurn(revenue.users, 'Active');
        // console.log('data', validTurnR)
        // return validTurnR;
        if (Object.keys(validTurnR).length <= 0) {
            const resError: ResponseError = {
                codeHttp: '400',
                code: "NOT_FOUND_TURN",
                message: 'Para Ingresar un Cierre de Caja debes tener un turno activo en la jornada de hoy'
            } 
            return resError;
        }
        console.log('inregos al revenue', revenue)
        revenue.revenue.turn = validTurnR[0]._id as string;
        revenue.revenue.workingDay = validTurnR[0].workingDay[0] as string;
        const resultData = await insertRevenue(revenue)
        return resultData;
    }
    
}

const insertOrUpdateRevenueOther = async (revenue: RequestRevenueWorkingDay) => {
    // return revenue
    if (revenue?.revenue.totalAmount as number  <=0 ) {
        return "NOT_FOUND_TOTALAMOUNT";
    }

    let dataF: any = [];
    if (Object.keys(revenue.files as any).length > 0) {
            revenue.files?.forEach(element => {
            dataF.push({
                path:element.path as string,
                pathView: `${process.cwd()}/storage/${element.filename}`,
                filename: element.filename,
                size: element.size,
                mimetype:  element.mimetype
            })
        });
        revenue.files = dataF
        revenue.revenue.files = dataF
    }
// return revenue.id
    if ( revenue.id ) {
        const resultUpdate = await updateRevenue(revenue.id as string, revenue);
        return resultUpdate;
    } else {
        let resulData: any = [];
        const resultDate = await getWorkingForDate();
        // return [resultDate];
        if ( Object.keys(resultDate).length == 0) {
            resulData = await insertWorkingDay();
        } else {
            resulData = resultDate[0];
        }
        revenue.revenue.workingDay = resulData._id as string;
        const resultData = await insertRevenue(revenue)
        return resultData;
    }
    
}

const insertRevenue = async (revenue: RequestRevenueWorkingDay) => {
    console.log('inregos al insertRevenue')
    const responseInsert = await RevenueModel.create(revenue.revenue);
    console.log('result revenue insert',responseInsert)
    return responseInsert;
}

const updateRevenue = async (revenueId: string, revenue: RequestRevenueWorkingDay) => {

    const validRevenue = await getRevenueValid(revenueId);
    if (Object.keys(validRevenue).length > 0) {
        const dataRevenue: Revenue = {
            amountTransfer: revenue.revenue.amountTransfer,
            amountPos: revenue.revenue.amountPos,
            amountCash: revenue.revenue.amountCash,
            amountOther: revenue.revenue.amountOther,
            amountSistem: revenue.revenue.amountSistem,
            description: revenue.revenue.description,
            cashFund: revenue.revenue.cashFund,
            amountTurn: revenue.revenue.totalAmount,
            totalAmount: revenue.revenue.totalAmount,
            type: revenue.revenue.type,
            validAdmin:  revenue.validAdmin,
            noteValid:  revenue.noteValid === undefined ? '' : revenue.noteValid,
            usersAdmin:  revenue.usersAdmin,
            validDate: new Date()
        }
        
        let infoFile: any = [];
        if (Object.keys(revenue?.dataFiles as any).length > 0 && Object.keys(revenue?.files as any).length > 0) {
            await revenue?.dataFiles?.forEach(element => {
                infoFile.push({
                    filename: element.filename,
                    path:element.path as string,
                    pathView: `${process.cwd()}/storage/${element.filename}`,
                    size: element.size,
                    mimetype:  element.mimetype
                });
                
            });

            await revenue?.files?.forEach(element => {
                infoFile.push({
                    filename: element.filename,
                    path:element.path as string,
                    pathView: `${process.cwd()}/storage/${element.filename}`,
                    size: element.size,
                    mimetype:  element.mimetype
                });
                
            });
            dataRevenue.files = infoFile
        } else if(Object.keys(revenue?.files as any).length > 0){
            dataRevenue.files = revenue.files;
        } else if(Object.keys(revenue?.dataFiles as any).length > 0){
            await revenue?.dataFiles?.forEach(element => {
                infoFile.push({
                    filename: element.filename,
                    path:element.path as string,
                    pathView: `${process.cwd()}/storage/${element.filename}`,
                    size: element.size,
                    mimetype:  element.mimetype
                });
                
            });
            dataRevenue.files = infoFile
        }

        const responseInsertR = await RevenueModel.findOneAndUpdate(
            {_id: revenueId },
            dataRevenue,
            { new: true }
        );
        return responseInsertR; 
    } 
}

const validRevenueOther = async (users: string) => {
    let now= new Date();

    const responseTurn = await RevenueModel.find({
         users: users
    }); 
    return responseTurn;
}

const validRevenueWorkingDay = async (turn: string) => {
    let now= new Date();
    const formatoMap = { dd: now.getDate(), mm: now.getMonth() + 1, yyyy: now.getFullYear()};

    var dateStr = new Date(formatoMap.yyyy, formatoMap.mm-1,formatoMap.dd,0,0,0,0);
    var nextDate = new Date(formatoMap.yyyy,formatoMap.mm-1,formatoMap.dd,23,59,59, 999);
    const responseTurn = await RevenueModel.find({
        createdAt: { $gte: dateStr, $lt: nextDate},
         turns: turn
    }); 
    return responseTurn;
}


const validPaidRevenue = (revenue: RequestRevenueWorkingDay): string => {
    if (revenue?.revenue.totalAmount as number  <=0 ) {
        return "NOT_FOUND_TOTALAMOUNT";
    }

    if (revenue?.revenue.amountSistem as number  <=0 ) {
        return "NOT_FOUND_AMOUNTSISTEM";
    }

    // if (revenue?.revenue.amountTurn as number  <=0 ) {
    //     return "NOT_FOUND_AMOUNTURN";
    // }

    if (revenue.revenue == undefined || Object.entries(revenue.revenue).length == 0) {
        return "NOT_FOUND_DATA_REVENUE";
    }
    const result =  ( Number(revenue?.revenue?.amountCash)  
                    + Number(revenue?.revenue?.amountOther) 
                    + Number(revenue?.revenue?.amountPos) 
                    + Number(revenue?.revenue?.amountTransfer))

    console.log('result', result)
    if (result !== revenue.revenue.totalAmount) {
        return "AMOUNTTURN_DISTINC_SUM_DETAIL_REVENUE";
    }
    // if (revenue.detailRevenue == undefined || Object.entries(revenue.detailRevenue).length == 0) {
    //     return "NOT_FOUND_DATA_DETAIL_REVENUE";
    // }

    // let valueAmount: number = 0;
    // valueAmount = revenue.detailRevenue.filter(d => parseInt(d.amount) ).map(d => d.amount).reduce((a, b) => a  + b, 0);
    // console.log('valueAmount', valueAmount)
    // console.log('revenue.revenue.amountTurn', revenue.revenue.amountTurn)
    // if (valueAmount != revenue.revenue.amountTurn ) {
    //     return "AMOUNTTURN_DISTINC_SUM_DETAIL_REVENUE";
    // }
    
    return "VALID_SUCCESS";
}

const createDetailRevenue = async (revenueId: string, data: RequestRevenueWorkingDay) => {
    
    // let dataDetailRevenue: any = [];
    // await data.detailRevenue.forEach(
    //     (item: any) => {
    //     const detailRevenue: DetailRevenue = {
    //         type: item.type,
    //         description: item.description,
    //         amount: item.amount,
    //         revenues: revenueId
    //     }
    //     dataDetailRevenue.push(detailRevenue)
    // });
    // const resultInsert = await  DetailRevenueModel.insertMany(dataDetailRevenue);
    // return resultInsert;
}

const getDetailRevenue = async (revenueId: string) => {
    // const resp = await DetailRevenueModel.find({
    //     revenue: revenueId
    // });
    // return resp;    
}

const getRevenueValid = async (id: string) => {

    const resp = await RevenueModel.find({
        id: id
    });
    
    return resp;    
}

const getRevenues = async () => {
    const responseItem = await RevenueModel.find({});
    return responseItem;
}

const getRevenue = async (id:string) => {
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
        const ObjectI = mongoose.Types.ObjectId;
        // 63ec10592073ceeccba8bf9e
        valid = { _id: new ObjectI(id)};
        // valid = {type: 'cleaning_products'};
        console.log('llego por aca', valid)
        
        const responseItem = await RevenueModel.aggregate([
            { $match: valid },
            { $lookup: { from:'users', localField: 'users', foreignField: '_id',as:'users'}},
            { $lookup: { from:'workingdays', localField: 'workingDay', foreignField: '_id',as:'workingDay'}},
            { $lookup: { from:'detailrevenues', localField: '_id', foreignField: 'revenues', as:'detailRevenue'}},
            { $sort: { 'createdAt': -1 } },
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

const getRevenueTurn = async (revenue: any) => {
    
    let filter: any = {};
    const Objectid = mongoose.Types.ObjectId;
    
    // const _id = revenue._idTurn || null;
    // console.log('order id', revenue)
    // return order;
    // console.log('llego por aca')
    const turn = revenue.turn || '';
    // const workingDay = revenue.workingDay || '';
    const users = revenue.users || '';
    const role = revenue.role || '';
    const page = parseInt(revenue.page, 10)  || 1;
    const limit = parseInt(revenue.limit, 10) || 10;
    const type = revenue.type || '';
    const startDate = revenue.startDate || null;
    const endDate = revenue.endDate || null;
    
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
        nextPage: 0,
        sum: 0 
    }
    
    // if (_id !== null) {
    //     filter._id = new ObjectId(_id) ;
    // }

    if (turn !== "") {
        // console.log('ingreso turn')
        filter.turn = new Objectid(turn) ;
    }
console.log('users', role)
    if (type !== "") {
        console.log('ingreso type')
        filter.type = type;
    }
    console.log('filter get-revenue-turn', filter)
    if (users !== "" && role !== 'Admin') {
        console.log('ingreso es users')
        // filter.users = new ObjectId(users) ;
        filter.users = new Objectid(users);
    } else {
        console.log('es admin')
    }
    // console.log('turn', users)
    // return workingDay;
    // if (workingDay !== null) {
    //     filter.workingDay = new ObjectId(workingDay) ;
    // }
    // return revenue;
    // console.log('startDate dddd', startDate)
    // console.log('endDate gg', endDate)
    // startDate !== undefined &&
    // endDate !== undefined && 
    if ( ( revenue?.startDate !== 'null') && ( revenue?.endDate !== 'null') ) {
        const dataStartDate = startDate.split("/");
        const dataEndDate = endDate.split("/");
        var dateStr = new Date(dataStartDate[2], dataStartDate[0]-1,dataStartDate[1],0,0,0,0);
        var nextDate = new Date(dataEndDate[2],dataEndDate[0]-1,dataEndDate[1],23,59,59, 999);
        
        filter.createdAt = {
            $gte: dateStr, $lt: nextDate
        }
    } else {
        let now= new Date();
        const formatoMap = {
            dd: now.getDate(),
            mm: now.getMonth(),
            yyyy: now.getFullYear()
        };
       
        var dateStr = new Date(formatoMap.yyyy, formatoMap.mm, formatoMap.dd,0,0,0,0);
        var nextDate = new Date(formatoMap.yyyy,formatoMap.mm, formatoMap.dd,23,59,59, 999);
        filter.createdAt = {
            $gte: dateStr, $lt: nextDate
        }
    }

    try {
        const responseItem = await RevenueModel.aggregate(
            [
                { $match: filter },
                { $lookup: { from:'users', localField: 'users', foreignField: '_id',as:'users'}},
                { $lookup: { from:'workingdays', localField: 'workingDay', foreignField: '_id',as:'workingDay'}},
                {
                    $setWindowFields: {
                    output: { 
                        totalDocs: { $count: {} },
                    },
                },
                },
                { $sort: { 'createdAt': -1 } },
                { $skip: (page - 1) * limit || 0 },
                { $limit: Number(limit) },
                { 
                    $group: 
                        { _id : null, sum : { $sum: "$totalAmount" },
                        "datos": {
                            "$push": {
                              "_id": "$_id",
                              "amountCash": "$amountCash",
                              "amountOther": "$amountOther",
                              "amountPos": "$amountPos",
                              "amountSistem": "$amountSistem",
                              "amountTransfer": "$amountTransfer",
                              "cashFund": "$cashFund",
                              "createdAt": "$createdAt",
                              "description": "$description",
                              "detailRevenue": "$detailRevenue",
                              "files": "$files",
                              "totalAmount": "$totalAmount",
                              "totalDocs": "$totalDocs",
                              "turn": "$turn",
                              "updatedAt": "$updatedAt",
                              "users": "$users",
                              "workingDay": "$workingDay",
                              "type": "$type",
                              "validAdmin": "$validAdmin",
                              "noteValid": "$noteValid",
                              "validDate": "$validDate",
                              "usersAdmin": "$usersAdmin",
                            }
                          } 
                        }
                         
                }
            ]
        );

        
        if (Object.entries(responseItem).length > 0) {
            response.docs = responseItem[0]?.datos;
            response.totalDocs = responseItem[0]?.datos[0]?.totalDocs;
            response.limit = limit;
            response.sum = responseItem[0]?.sum;
            response.totalPages = Math.ceil( responseItem[0]?.datos[0]?.totalDocs / limit );
            response.page = (page - 1) * limit || 0;
            response.prevPage = page;
            response.nextPage = (page + 1);
        }
        return response;
    } catch (e) {
        console.log(e)
    }
}

const getRevenueOther = async (revenue: any) => {
    
    let filter: any = {};
    const Objectid = mongoose.Types.ObjectId;
    
    // const _id = revenue._idTurn || null;
    // console.log('order id', revenue)
    // return order;
    
    const turn = revenue.turn || '';
    // const workingDay = revenue.workingDay || '';
    const users = revenue.users || '';
    const page = parseInt(revenue.page, 10)  || 1;
    const limit = parseInt(revenue.limit, 10) || 10;
    const startDate = revenue.startDate || null;
    const endDate = revenue.endDate || null;
    
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
        nextPage: 0,
        sum: 0 
    }
    
    // if (_id !== null) {
    //     filter._id = new ObjectId(_id) ;
    // }

    if (turn !== "") {
        // console.log('ingreso turn')
        filter.turn = new Objectid(turn) ;
    }

    // if (users !== "") {
    //     console.log('ingreso turn')
    //     filter.users = new ObjectId(users) ;
    // }
    // console.log('turn', users)
    // return workingDay;
    // if (workingDay !== null) {
    //     filter.workingDay = new ObjectId(workingDay) ;
    // }
    // return revenue;
    // console.log('startDate dddd', startDate)
    // console.log('endDate gg', endDate)
    // startDate !== undefined &&
    // endDate !== undefined && 
    if ( ( revenue?.startDate !== 'null') && ( revenue?.endDate !== 'null') ) {
        const dataStartDate = startDate.split("/");
        const dataEndDate = endDate.split("/");
        var dateStr = new Date(dataStartDate[2], dataStartDate[0]-1,dataStartDate[1],0,0,0,0);
        var nextDate = new Date(dataEndDate[2],dataEndDate[0]-1,dataEndDate[1],23,59,59, 999);
        
        filter.createdAt = {
            $gte: dateStr, $lt: nextDate
        }
    } else {
        let now= new Date();
        const formatoMap = {
            dd: now.getDate(),
            mm: now.getMonth(),
            yyyy: now.getFullYear()
        };
       
        var dateStr = new Date(formatoMap.yyyy, formatoMap.mm, formatoMap.dd,0,0,0,0);
        var nextDate = new Date(formatoMap.yyyy,formatoMap.mm, formatoMap.dd,23,59,59, 999);
        filter.createdAt = {
            $gte: dateStr, $lt: nextDate
        }
    }
    try {
        const responseItem = await RevenueModel.aggregate(
            [
                { $match: filter },
                { $lookup: { from:'users', localField: 'users', foreignField: '_id',as:'users'}},
                { $lookup: { from:'workingdays', localField: 'workingDay', foreignField: '_id',as:'workingDay'}},
                // { $lookup: { from:'detailrevenues', localField: '_id', foreignField: 'revenues', as:'detailRevenue'}},
                {
                    $setWindowFields: {
                    output: { 
                        totalDocs: { $count: {} },
                    },
                },
                },
                { $sort: { 'createdAt': -1 } },
                { $skip: (page - 1) * limit || 0 },
                { $limit: Number(limit) },
                { 
                    $group: 
                        { _id : null, sum : { $sum: "$totalAmount" },
                        "datos": {
                            "$push": {
                              "_id": "$_id",
                              "amountCash": "$amountCash",
                              "amountOther": "$amountOther",
                              "amountPos": "$amountPos",
                              "amountSistem": "$amountSistem",
                              "amountTransfer": "$amountTransfer",
                              "cashFund": "$cashFund",
                              "createdAt": "$createdAt",
                              "description": "$description",
                              "detailRevenue": "$detailRevenue",
                              "files": "$files",
                              "totalAmount": "$totalAmount",
                              "totalDocs": "$totalDocs",
                              "turn": "$turn",
                              "updatedAt": "$updatedAt",
                              "users": "$users",
                              "workingDay": "$workingDay",
                            }
                          } 
                        }
                         
                }
            ]
        );

        
        if (Object.entries(responseItem).length > 0) {
            response.docs = responseItem[0]?.datos;
            response.totalDocs = responseItem[0]?.datos[0]?.totalDocs;
            response.limit = limit;
            response.sum = responseItem[0]?.sum;
            response.totalPages = Math.ceil( responseItem[0]?.datos[0]?.totalDocs / limit );
            response.page = (page - 1) * limit || 0;
            response.prevPage = page;
            response.nextPage = (page + 1);
        }
        return response;
    } catch (e) {
        console.log(e)
    }
}

export { insertOrUpdateRevenueWorkingDay, insertOrUpdateRevenueOther, getRevenues, getRevenue, getRevenueTurn, getRevenueOther };