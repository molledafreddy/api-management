import { WorkingDay } from "../interfaces/working-day.interface";
import workingDayModel from "../models/workingDay";

const insertWorkingDay = async () => {
    // const resultDate = await getWorkingForDate();
    // Object.keys(resultDate).length === 0
    const workingD: WorkingDay = await {
        type: 'normal'
    };
    // console.log('retorno de Object', Object.keys(resultDate).length )
    // if ( Object.keys(resultDate).length == 0) {
    const responseInsert = await workingDayModel.create(workingD);
    return responseInsert;
        console.log('no tiene registros');
    // } else {
    //     console.log('si tiene registros');
    // }
    // return responseInsert;
}

const getWorkingForDate = async () => {
    let now= new Date();
    const formatoMap = {
        dd: now.getDate(),
        mm: now.getMonth() + 1,
        yy: now.getFullYear().toString().slice(-2),
        yyyy: now.getFullYear()
    };
    var dateStr = new Date(formatoMap.yyyy,formatoMap.mm,formatoMap.dd,0,0,0);
    var nextDate = new Date(formatoMap.yyyy,formatoMap.mm,formatoMap.dd,23,59,59);
    const responseItem = await workingDayModel.find({
        created_at: {
            $gte: dateStr,
            $lt: nextDate
         }
        });
    return responseItem;
}

const getWorkingDays = async () => {
    const responseItem = await workingDayModel.find({});
    return responseItem;
}


const getWorkingDay = async (id:string) => {
    const responseItem = await workingDayModel.findOne({_id:id});
    return responseItem;
}

const updatetWorkingDay = async (id:string, data: WorkingDay) => {
    const responseItem = await workingDayModel.findOneAndUpdate(
        {_id: id },
        data,
        { new: true }
    );
    
    
    return responseItem;
}

const deleteWorkingDay = async (id:string) => {
    const responseItem = await workingDayModel.remove({_id:id});
    return responseItem;
}

export { insertWorkingDay, getWorkingForDate, getWorkingDays, getWorkingDay, updatetWorkingDay, deleteWorkingDay };