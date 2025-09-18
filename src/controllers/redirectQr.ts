import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { RequestExt } from "../interfaces/request-ext.interface";
import { getBank as bank, getBanks as banks, insertBank, updateBank as updateA, deleteBank as deleteA } from "../services/bank";
import { handleHttp } from "../utils/error.handle";

const getRedirectQr = async ({params}: Request, res: Response) => {
  try {
      let numero = "56949079809"; // Número de teléfono del destinatario
      let apiWhatsapp = `https://wa.me/${numero}?text=Me%20gustaria%20Realizar%20un%20Pedido`;

      // Responde al cliente con el enlace
      res.redirect(302, apiWhatsapp);
  } catch (e) {
      handleHttp(res, "ERROR_GET_BANK")
  }
}



export { getRedirectQr };