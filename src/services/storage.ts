import { Car } from "../interfaces/car.interface";
import { Storage } from "../interfaces/storage.interface";
import StorageModel from "../models/storage";

const registerUpload = async ({fileName, idUser, path}: Storage) => {
    const responseInsert = await StorageModel.create({fileName, idUser, path});
    return responseInsert;
}



export { registerUpload };