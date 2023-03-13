import { Request } from "express";
// import express from "express";
import fileUpload from "express-fileupload";
import multer, { diskStorage } from "multer";

const PATH_STORAGE = `${process.cwd()}/storage`;

const storage = diskStorage({
  destination(req: Request, file: Express.Multer.File, cb: any) {
    cb(null, PATH_STORAGE);
  },
  filename(req: Request, file: Express.Multer.File, cb: any) {
    const ext = file.originalname.split(".").pop();
    const fileNameRandom = `image-${Date.now()}.${ext}`;
    cb(null, fileNameRandom);
  },
});


const multerMiddleware = multer({ storage }).array('files');
// const multerMiddleware = multer({ storage });

export default multerMiddleware;

// const app = express();
// const data = app.use(fileUpload({
//   useTempFiles : true,
//   tempFileDir : './prueba'
//   // tempFileDir : `${process.cwd()}/uploads`
// }));
// export default data;