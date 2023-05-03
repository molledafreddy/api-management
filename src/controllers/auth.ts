import { Request, Response } from "express";
import { registerNewUser, loginUser } from "../services/auth";

const registerCtrl = async ({body}: Request, res: Response ) => {
    const responseUser = await registerNewUser(body);
    res.send(responseUser);
};

const loginCtrl = async ({body}: Request, res: Response ) => {
    const {email, password} = body;
    const dataEmail = email.toLowerCase()
    const responseUser = await loginUser({email: dataEmail, password});

    if (responseUser === "NOT_FOUND_USER") {
        res.status(403);
        res.send(responseUser);
    } else {
        res.send(responseUser);
    }
};

export { loginCtrl, registerCtrl}