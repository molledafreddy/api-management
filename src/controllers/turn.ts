import { Request, response, Response } from "express";
import { RequestExt } from "../interfaces/request-ext.interface";
import { insertTurn, searchTurnForUser, getTurn as turnId, getCars, getCar, updateCar, deleteCar } from "../services/turn";
import { handleHttp } from "../utils/error.handle";

const getTurn = async ({params}: Request, res: Response) => {
    try {
        const {id} = params;
        const response = await turnId(id);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    } catch (e) {
        handleHttp(res, "ERROR_GET_TURN")
    }
}

const getTurns = async (req: Request, res: Response) => {
    try {
        const response = await getCars();
        res.send(response);
    } catch (e) {
        handleHttp(res, "ERROR_GET_TURNS")
    }
}

const getTurnsForUser = async (req: RequestExt, res: Response) => {
    try {
        const { user, query } = req;
        query.users = `${user?._id}`;
        console.log('datos query', query)
        const response = await searchTurnForUser(query);
        res.send(response);
    } catch (e) {
        handleHttp(res, "ERROR_GET_TURNS")
    }
}

const updateTurn = async ({params, body}: Request, res: Response) => {
    try {
        const {id} = params;
        const response = await updateCar(id, body);
        res.send(response);
    } catch (e) {
        handleHttp(res, "ERROR_UPDATE_TURNS")
    }
}

const postTurn = async (req: RequestExt, res: Response) => {
    try {
        const { user, body } = req;
        body.users = `${user?._id}`;
        // console.log('body',body)
        // res.send(body);
        const  responseTurn = await insertTurn(body);
        res.send(responseTurn);
    } catch (e) {
        handleHttp(res, "ERROR_POST_TURNS", e)
    }
}

const deleteTurn = async ({params}: Request, res: Response) => {
    try {
        const {id} = params;
        const response = await deleteCar(id);
        res.send(response);
    } catch (e) {
        handleHttp(res, "ERROR_DELETE_TURNS")
    }
}

export {getTurn, getTurns, getTurnsForUser, updateTurn, postTurn, deleteTurn};