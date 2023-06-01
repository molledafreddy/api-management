import { Car } from "../interfaces/car.interface";
import { Storage } from "../interfaces/storage.interface";
import StorageModel from "../models/storage";
import cloudinary from "../utils/cloudinary";
import fs from "fs";
import { RequestFiles } from '../interfaces/request-files.interface';
import { handleHttp } from "../utils/error.handle";

const registerUpload = async ({fileName, idUser, path}: Storage) => {
    const responseInsert = await StorageModel.create({fileName, idUser, path});
    return responseInsert;
}

const registerUploadCloudinary = async (data: any) => {
    try {
        let response: any = [];
        if (Object.keys(data.files as any).length > 0) {
          let res_promises = data.files.map((file: { path: string; }) => new Promise((resolve, reject) => {
            cloudinary.uploader.upload(file.path, { use_filename: true, unique_filename: false }, function (error, result) {
                if(error) reject(error)
                else resolve(result)
            })
          })
          )

           response = await  Promise.all(res_promises)
           .then(result =>  {
                data.files.forEach((file: { path: string; })  => {
                fs.unlinkSync(file.path)
            });
            return result;
          })
          .catch((error) => {/*  handle error */ })
        }
        return response;
      } catch (e) {
        console.log(e)
      }
}

const deleteImage = async (public_id: string) => {
    const response = await cloudinary.uploader.destroy(public_id, function(result) { console.log('result',result) });
    // const responseInsert = await StorageModel.create({fileName, idUser, path});
    return response;
}



export { registerUpload, registerUploadCloudinary, deleteImage };