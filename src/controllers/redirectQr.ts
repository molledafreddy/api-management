import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { RequestExt } from "../interfaces/request-ext.interface";
import { getBank as bank, getBanks as banks, insertBank, updateBank as updateA, deleteBank as deleteA } from "../services/bank";
import { handleHttp } from "../utils/error.handle";

const getRedirectQr = async ({params}: Request, res: Response) => {
  try {
    console.log("aaaaaa");
      const {id} = params;
      const link = `https://wa.me/qr/VUWTFMISM33CL1`;

      let numero = "56936499908"; // Número de teléfono del destinatario
      let mensaje = "¡Hola! Vengo de la aplicación.";
      let mensajeEncoded = encodeURIComponent(mensaje); // Codificar el mensaje /?text=${mensajeEncoded}

      let urlWhatsapp = `https://wa.me/${numero}`;

      // Responde al cliente con el enlace
      const data = {
        status: 200,
        body: {
          message: "Haz clic para contactarnos",
          whatsapp_link: urlWhatsapp
        }
      };
     // const response = await bank(id);
     // const data = response ? response : "NOT_FOUNDsss";
      res.send(urlWhatsapp);
  } catch (e) {
      handleHttp(res, "ERROR_GET_BANK")
  }
}



export { getRedirectQr };