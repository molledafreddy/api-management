import { Bank } from "../interfaces/bank.interface";
import BankModel from "../models/bank";
import { getProvider } from "./provider";
import { getWorkingForDate, insertWorkingDay } from "./workingDay";

const getBanks = async () => {
    console.log('llego por aca getBanks')
    const responseItem = await BankModel.find({});
    return responseItem;
}

const getBank = async (id:string) => {
    const responseItem = await BankModel.findOne({_id:id});
    return responseItem;
}

const insertBank = async (account: Bank) => {
    const response = await BankModel.create(account);
    return response;
}

const updateBank = async (id:string, data: Bank) => {
    const responseItem = await BankModel.findOneAndUpdate(
        {_id: id },
        data,
        { new: true }
    );
    
    
    return responseItem;
}

const deleteBank = async (id:string) => {
    const responseItem = await BankModel.remove({_id:id});
    return responseItem;
}




export { getBanks, getBank, insertBank, updateBank, deleteBank };