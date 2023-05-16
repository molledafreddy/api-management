import { Provider } from "../interfaces/provider.interface";
import ProviderModel from "../models/Provider";
import { getWorkingForDate, deleteWorkingDay, insertWorkingDay, getWorkingDays } from "./workingDay";
import { WorkingDay } from "../interfaces/working-day.interface";
import { ResponsePagination } from "../interfaces/response-pagination.interface";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const insertProvider = async (provider: Provider) => {
    const responseInsert = await ProviderModel.create(provider);
    return responseInsert;
}

const validTurn = async (userId:string) => {

    let now= new Date();
    const formatoMap = {
        dd: now.getDate(),
        mm: now.getMonth() + 1,
        yy: now.getFullYear().toString().slice(-2),
        yyyy: now.getFullYear()
    };
    var dateStr = new Date(formatoMap.yyyy,formatoMap.mm,formatoMap.dd,0,0,0);
    var nextDate = new Date(formatoMap.yyyy,formatoMap.mm,formatoMap.dd,23,59,59);
    const responseTurn = await ProviderModel.find({
        created_at: {
            $gte: dateStr,
            $lt: nextDate
         },
         users: userId
        });


    // const responseItem = await Turn.findOne({_id:id});
    return responseTurn;
}

const getSearchProvider = async (query: any) => {
    let valid: any = {};
    const page = parseInt(query.page, 10)  || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const search = query.search || null;
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
    const options = {
        page: parseInt(query.page, 10)  || 1,
        limit: parseInt(query.limit, 10) || 10
    }
   
    if (search != null) {
        valid = {
            $text:{
                $search: `\"${search}\" authority key`
            }
        }
    } 
    
    const responseItem = await ProviderModel.paginate( valid, options );
    // if (Object.entries(responseItem).length > 0) {
    //     response.docs = responseItem;
    //     response.totalDocs = responseItem[0].totalDocs;
    //     response.limit = limit;
    //     response.totalPages = Math.ceil( responseItem[0].totalDocs / limit );
    //     response.page = (page - 1) * limit || 0;
    //     response.prevPage = page;
    //     response.nextPage = (page + 1);
    // }
    // return response;
    return responseItem;
}

const getProviders = async () => {
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
    const responseItem = await ProviderModel.find({});
    if (Object.entries(responseItem).length > 0) {
        response.docs = responseItem;
        response.totalDocs = responseItem as any;
            
    }
    return response;
}

const getProvider = async (id:string) => {
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
        const ObjectId = mongoose.Types.ObjectId;
        valid = { _id: new ObjectId(id)};
        const responseItem = await ProviderModel.aggregate([
            { $match: valid },
        ]);

       if (Object.entries(responseItem as any).length > 0) {
            response.docs = responseItem as any;
        }
        
        return response;
    } catch (error) {
        console.log('error', error)
        
    }
}

const updateProvider = async ( id:any, data: Provider) => {
    const responseItem = await ProviderModel.findOneAndUpdate(
        {_id: id },
        data,
        { new: true }
    );
    
    return responseItem;
}

const deleteProvider = async (id:string) => {
    const responseItem = await ProviderModel.remove({_id:id});
    return responseItem;
}

export { insertProvider, getProviders, getProvider, getSearchProvider, updateProvider, deleteProvider };