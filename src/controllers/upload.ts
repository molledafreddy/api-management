import { Request, Response } from "express";
import dbConnect from "../config/mongo";
import { RequestExt } from "../interfaces/request-ext.interface";
import { Storage } from "../interfaces/storage.interface";
import { registerUpload } from "../services/storage";
import { handleHttp } from "../utils/error.handle";

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
    // JSON.parse('[1, 2, 3, 4, ]');
    // const response = await registerUpload(dataToRegister);
    // res.send(response);
    res.send(req.body);
  } catch (e) {
    console.log(e)
    handleHttp(res, "ERROR_GET_BLOG");
  }
};

export { getFile };