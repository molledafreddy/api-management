import { Request, Response } from "express";
// import dbConnect from "../config/mongo";
import { RequestExt } from "../interfaces/request-ext.interface";
import { Storage } from "../interfaces/storage.interface";
import { registerUpload, registerUploadCloudinary, deleteImage } from "../services/storage";
import { handleHttp } from "../utils/error.handle";
import cloudinary from "../utils/cloudinary";
import fs from "fs";
import { RequestFiles } from '../interfaces/request-files.interface';

const getFile = async (req: RequestExt, res: Response) => {
  try {
    console.log('llego po asca getFilegetFilegetFilegetFile', req.body.revenue)
    const { user, file } = req;
    const dataToRegister: Storage = {
      fileName: `${file?.filename}`,
      idUser: `${user?._id}`,
      path: `${file?.path}`,
    };
    var coche = JSON.parse(req.body.revenue.toString());
    var json = JSON.stringify(coche);

    var coche2 = JSON.parse(req.body.detailRevenue.toString());
    var detailRevenue = JSON.stringify(coche2);
    console.log('file?.path', file?.path)
    // const res = claudinary.uploader.
    //   upload('https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg', {public_id: "olympic_flag"})

    // res.then((data) => {
    //   console.log(data);
    //   console.log(data.secure_url);
    // }).catch((err) => {
    //   console.log(err);
    // });
    // JSON.parse('[1, 2, 3, 4, ]');
    // const response = await registerUpload(dataToRegister);
    // res.send(response);
    res.send(req.body);
  } catch (e) {
    console.log(e)
    handleHttp(res, "ERROR_GET_BLOG");
  }
};

const postImg = async (req: RequestExt, res: Response) => {
  try {
    const { user, files } = req;
    // console.log('llego po asca files', files)
    const dataToRegister: Storage = {
      fileName: `${files?.filename}`,
      idUser: `${user?._id}`,
      path: `${files?.path}`,
    };
    let response: any = [];
    let dataFiles: any = [];
    dataFiles.files = files;
    if (Object.keys(dataFiles.files as any).length > 0) { 
      // console.log('dataFiles', dataFiles)
      response = await registerUploadCloudinary(dataFiles);
    }
    

    console.log('response', response)
    res.send(response);
    // res.send(req.body);
  } catch (e) {
    console.log(e)
    handleHttp(res, "ERROR_GET_BLOG");
  }
};

const deleteImg = async ({params}: Request, res: Response) => {
  try {
    const {id} = params;
    console.log('id', id)
    const response = await deleteImage(id);
    res.send(response);
  } catch (e) {
    console.log(e)
    handleHttp(res, "ERROR_GET_BLOG");
  }
};

export { getFile , postImg, deleteImg};