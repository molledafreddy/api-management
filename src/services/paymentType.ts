import { paymentType } from "../interfaces/payment-type.interface";
import PaymentTypeModel from "../models/paymentType";
import { getProvider } from "./provider";
import { getWorkingForDate, insertWorkingDay } from "./workingDay";

const getPaymentTypes = async () => {
    const responseItem = await PaymentTypeModel.find({});
    return responseItem;
}

const getPaymentType = async (id:string) => {
    const responseItem = await PaymentTypeModel.findOne({_id:id});
    return responseItem;
}

const insertPaymentType = async (account: paymentType) => {
    const response = await PaymentTypeModel.create(account);
    return response;
}

const updatePaymentType = async (id:string, data: paymentType) => {
    const responseItem = await PaymentTypeModel.findOneAndUpdate(
        {_id: id },
        data,
        { new: true }
    );
    
    
    return responseItem;
}

const deletePaymentType = async (id:string) => {
    const responseItem = await PaymentTypeModel.remove({_id:id});
    return responseItem;
}




export { getPaymentTypes, getPaymentType, insertPaymentType, updatePaymentType, deletePaymentType };