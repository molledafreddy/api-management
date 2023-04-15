import { Turn as TurnInterf } from "../interfaces/turn.interface";
import Turn from "../models/turn";
import { getWorkingForDate, deleteWorkingDay, insertWorkingDay, getWorkingDays } from "./workingDay";
import { WorkingDay } from "../interfaces/working-day.interface";

import mongoose from "mongoose";
import { ResponsePagination } from "../interfaces/response-pagination.interface";
import { RequestTurn } from "../interfaces/request-turn.interface";
// import {  } from "/workingDay";}
const ObjectId = mongoose.Types.ObjectId;

const insertTurn = async (turn: RequestTurn) => {

    let resulData: any = [];
    const status = turn.status || '';
    let convertFechaStart = turn.startDate.toString();
    let resultStart: any = convertFechaStart.split(" ");
    let dataHoraStart: string = resultStart[1]
    let horaStart = dataHoraStart.split(":");
    let HStar: number = Number(horaStart[0]);
    let MNStar: number = Number(horaStart[1]);
    let SStar: number = Number(horaStart[2]); 

    let dataFechaStart: string = resultStart[0]
    let fechaStart = dataFechaStart.split("/")
    let YStart: number = Number(fechaStart[2]);
    let MStart: number = Number(fechaStart[0]);
    let DStart: number = Number(fechaStart[1]);
    var dateStr = new Date(YStart, MStart-1, DStart, HStar-3, MNStar, SStar,0);
    
    let convertFechaEnd = turn?.endDate?.toString();
    let resultEnd: any = convertFechaEnd?.split(" ");
    let dataHoraEnd: string = resultEnd[1];
    let horaEnd = dataHoraEnd.split(":");
    let HEnd: number = Number(horaEnd[0]);
    let MNEnd: number = Number(horaEnd[1]);
    let SEnd: number = Number(horaEnd[2]); 

    let dataFechaEnd: string = resultEnd[0]
    let fechaEnd = dataFechaEnd.split("/")
    let YEnd: number = Number(fechaEnd[2]);
    let MEnd: number = Number(fechaEnd[0]);
    let DEnd: number = Number(fechaEnd[1]);

    var dateEnd = new Date(YEnd, MEnd-1, DEnd, HEnd-3, MNEnd, SEnd,0);
    
    const resultDate = await getWorkingForDate();
    if ( Object.keys(resultDate).length == 0) {
        resulData = await insertWorkingDay();
    } else {
        resulData = resultDate[0];
    }

    // return dataTurn;
    if (turn._id) {
        console.log('ingreso')
        const dataTurn: TurnInterf = {
            _id: turn?._id as any,
            startDate: dateStr,
            endDate: dateEnd,
            description: turn.description,
            type: turn.type,
            status: turn.status,
            statusPayment: 'Not_Payed',
        }
        // return dataTurn;
        const responseUpdate = await Turn.findOneAndUpdate(
            {_id: turn._id },
            dataTurn,
            { new: true }
        );
        console.log('responseUpdate', responseUpdate)
        return responseUpdate;
    } else {
        const validTurnR = await validTurn(turn.users, status);
        if (Object.keys(validTurnR).length != 0) {return "TURN_ACTIVE";}
        console.log('lego turn._id', turn )
        console.log('lego cfreara' )
        const dataTurn: TurnInterf = {
            startDate: dateStr,
            endDate: dateEnd,
            description: turn.description,
            users: turn.users,
            workingDay: resulData._id,
            type: turn.type,
            status: turn.status,
            statusPayment: 'Not_Payed',
        }
        // return dataTurn;
        const responseInsert = await Turn.create(dataTurn);
        console.log('datos ingreso',responseInsert )
        return responseInsert;
    }
   
   
}

const validTurn = async (userId:string, statusP: any) => {

    let now= new Date();
    let filter: any = {};
    
    const status = statusP || '';
    const users = userId || '';

    if (status !== '') {
        filter.status = status;
    }

    if (users !== '') {
        filter.users = new ObjectId(users);
    }
    // console.log('fecha de ahora', now)
    const formatoMap = {
        dd: now.getDate(),
        mm: now.getMonth() + 1,
        yy: now.getFullYear().toString().slice(-2),
        yyyy: now.getFullYear()
    };
    var dateStr = new Date(formatoMap.yyyy, formatoMap.mm-1,formatoMap.dd,0,0,0,0);
    var nextDate = new Date(formatoMap.yyyy,formatoMap.mm-1,formatoMap.dd,23,59,59, 999);
    filter.createdAt = {$gte: dateStr, $lt: nextDate}
    
    const responseTurn = await Turn.find({
        createdAt: { $gte: dateStr, $lt: nextDate},
        status: status,
         users: userId
        });
        
    return responseTurn;
}

const searchTurnForUser = async (turn: any) => {
    const ObjectId = mongoose.Types.ObjectId;
    
    let filter: any = {};
    
    const _id = turn._idTurn || null;
    // console.log('order id')
    // return order;
    const statusPayment = turn.statusPayment || '';
    const type = turn.type || '';
    const status = turn.status || '';
    const page = parseInt(turn.page, 10)  || 1;
    const limit = parseInt(turn.limit, 10) || 10;
    const startDate = turn.startDate || '';
    const endDate = turn.endDate || '';
    const users = turn.users || '';

    // return  endDate;
    // return order;
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
    
    if (_id !== null) {
        filter._id = new ObjectId(_id) ;
    } 
    // // return filter;
    // // 
    if (status !== '') {
        filter.status = status;
    }
    
    if (statusPayment !== '') {
        filter.statusPayment = statusPayment;
    }
    if (type !== '') {
        filter.type = type;
    }

    if (users !== '') {
        filter.users = new ObjectId(users);
    }
    // return filter;
    // console.log('Object.entries(order.date[0].estimateReceptionDate).length', order.date[0].estimateReceptionDate.firstDate)
    // return filter;
    // if ((turn.date.paymentDate?.firstDate !== null && turn.date.paymentDate?.firstDate !== undefined) 
    //     && (turn.date.paymentDate?.endDate !== null && turn.date.paymentDate?.endDate !== undefined)) {
    //     // console.log('llelsad', order?.estimateReceptionDate?.firstDate)
    //     const myArray = turn?.date.paymentDate?.firstDate.split("/");
    //     const myArray2 = turn?.date.paymentDate?.endDate.split("/");
    //     console.log('myArray', turn?.date.paymentDate?.firstDate.split("/"))
    //     filter.paymentDate = {
    //         $gte: new Date(myArray[0],myArray[1]-1,myArray[2],0,0,0),
    //         $lt: new Date(myArray2[0],myArray2[1]-1,myArray2[2],23,59,59)
    //     }
    // }

    if (( startDate !== '' && endDate !== '') ) {
        const dataStartDate = startDate.split("/");
        const dataEndDate = endDate.split("/");
        var dateStr = new Date(dataStartDate[2], dataStartDate[0]-1,dataStartDate[1],0,0,0,0);
        var nextDate = new Date(dataEndDate[2],dataEndDate[0]-1,dataEndDate[1],23,59,59, 999);
        
        filter.createdAt = {
            $gte: dateStr, $lt: nextDate
        }
    }

    console.log('filter', filter)
    // return filter;
    try {
        const responseItem = await Turn.aggregate(
            [
                { $match: filter},
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
            ]
        );
    
        if (Object.entries(responseItem).length > 0) {
            response.docs = responseItem;
            response.totalDocs = responseItem[0].totalDocs;
            response.limit = limit;
            response.totalPages = Math.ceil( responseItem[0].totalDocs / limit );
            response.page = (page - 1) * limit || 0;
            response.prevPage = page;
            response.nextPage = (page + 1);
        }
        return response;
    } catch (e) {
        console.log(e)
    }
}

const getTurn = async (id:string) => {
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
    
    try {
        // valid = {$eq: {_id:new mongoose.Types.ObjectId("63f7ebee0e2be4525a156238")}};
        const ObjectId = mongoose.Types.ObjectId;
        // 63ec10592073ceeccba8bf9e
        valid = { _id: new ObjectId(id)};
        // valid = {"_id":{$eq:new ObjectId("63f7ebee0e2be4525a156238")}}
        // valid = {type: 'cleaning_products'};
        console.log('llego por aca', valid)
        // await new mongoose.Types.ObjectId('6358403b25b29d9b3d42846c')
        
        const responseItem = await Turn.aggregate([
            { $match: valid },
            { $lookup: { from:'users', localField: 'users', foreignField: '_id',as:'users'}},
            { $lookup: { from:'workingdays', localField: 'workingDay', foreignField: '_id',as:'workingDay'}},
            { $sort: { 'createdAt': -1 } },
        ]);

         // const responseItem = await OperationBillSchemaModel.findOne({id}).populate('operationBills');
        // return responseItem;
        console.log('dataresponseItem',responseItem )
        if (Object.entries(responseItem as any).length > 0) {
            response.docs = responseItem as any;
            // response.totalDocs = responseItem[0].totalDocs;
            // response.limit = limit;
            // response.totalPages = Math.ceil( responseItem[0].totalDocs / limit );
            // response.page = (page - 1) * limit || 0;
            // response.prevPage = page;
            // response.nextPage = (page + 1);
        }
        
        return response;
    } catch (error) {
        console.log('error', error)
        
    }
}

const getCars = async () => {
    const responseItem = await Turn.find({});
    return responseItem;
}

const getCar = async (id:string) => {
    const responseItem = await Turn.findOne({_id:id});
    return responseItem;
}

const updateCar = async (id:string, data: TurnInterf) => {
    const responseItem = await Turn.findOneAndUpdate(
        {_id: id },
        data,
        { new: true }
    );
    
    
    return responseItem;
}

const deleteCar = async (id:string) => {
    const responseItem = await Turn.remove({_id:id});
    return responseItem;
}

export { insertTurn, searchTurnForUser, getTurn, getCars, getCar, updateCar, deleteCar, validTurn };

function ISODate(arg0: string) {
    throw new Error("Function not implemented.");
}
