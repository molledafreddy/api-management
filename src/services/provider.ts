import { Provider } from "../interfaces/provider.interface";
import ProviderModel from "../models/Provider";
import { getWorkingForDate, deleteWorkingDay, insertWorkingDay, getWorkingDays } from "./workingDay";
import { WorkingDay } from "../interfaces/working-day.interface";



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
    const search = query.search || null;
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
    return responseItem;
}

const getProviders = async () => {
    const responseItem = await ProviderModel.find({});
    return responseItem;
}

const getProvider = async (id:string) => {
    const responseItem = await ProviderModel.findOne({_id:id});
    return responseItem;
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