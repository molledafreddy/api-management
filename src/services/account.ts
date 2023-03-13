import { Account } from "../interfaces/account.interface";
import AccountModel from "../models/account";
import { getProvider } from "./provider";
import { getWorkingForDate, insertWorkingDay } from "./workingDay";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const getSearchAccount = async (query: any) => {
    // const responseItem = await AccountModel.find({});
    // return responseItem;

    let valid: any = {};
    const search = query.search || null;
    const options = {
        populate: [{path: 'providers'}, {path: 'banks'}],
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

    
    
    const responseItem = await AccountModel.paginate( valid, options );
    return responseItem;
}

const getAccounts = async (query: any) => {
    let valid: any = {};
    const search =  query.search || null;
    const options = {
        populate: [{path: 'providers'}, {path: 'banks'}],
        page: parseInt(query.page, 10)  || 1,
        limit: parseInt(query.limit, 10) || 10
    }
    
    if (search != null) {
        valid = { providers: search }
    } 
    const responseItem = await AccountModel.paginate( valid, options );
    return responseItem;
}

const getAccount = async (id:string) => {
    const responseItem = await AccountModel.findOne({_id:id});
    return responseItem;
}

const insertAccount = async (account: Account) => {
    const response = await AccountModel.create(account);
    return response;
}

const updateAccount = async (id:string, data: Account) => {
    const responseItem = await AccountModel.findOneAndUpdate(
        {_id: id },
        data,
        { new: true }
    );
    
    return responseItem;
}

const deleteAccount = async (id:string) => {
    const responseItem = await AccountModel.remove({_id:id});
    return responseItem;
}

export { getAccounts, getAccount, insertAccount, updateAccount, deleteAccount };