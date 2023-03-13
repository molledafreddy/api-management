import { Request, response, Response } from "express";
import { RequestExt } from "../interfaces/request-ext.interface";
import { insertProvider, 
         getProviders as providers, 
         getProvider as provider, 
         updateProvider as updateProviders,
         deleteProvider as deleteProviders,
         getSearchProvider as searchProvider } from "../services/provider";
import { handleHttp } from "../utils/error.handle";

const getProvider = async ({params}: Request, res: Response) => {
    try {
        const {id} = params;
        const response = await provider(id);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    } catch (e) {
        handleHttp(res, "ERROR_GET_ITEM")
    }
}

const getSearchProvider = async (req: Request, res: Response) => {
    try {
        const query = req.query;
        const response = await searchProvider(query);
        res.send(response);
    } catch (e) {
        console.log('error', e)
        handleHttp(res, "ERROR_GET_SEARCH_PROVIDERS")
    }
}

const getProviders = async (req: Request, res: Response) => {
    try {
        const response = await providers();
        res.send(response);
    } catch (e) {
        console.log('error', e)
        handleHttp(res, "ERROR_GET_PROVIDERS")
    }
}

const updateProvider = async ({params, body}: Request, res: Response) => {
    try {
        const {id} = params;
        const response = await updateProviders(id, body)
        // const response = await updateProvider(id, body);
        res.send(response);
    } catch (e) {
        handleHttp(res, "ERROR_UPDATE_PROVIDERS")
    }
}

const postProvider = async (req: RequestExt, res: Response) => {
    try {
        const { body } = req;
        const  responseTurn = await insertProvider(body);
        res.send(responseTurn);
    } catch (e) {
        handleHttp(res, "ERROR_POST_PROVIDERS", e)
    }
}

const deleteProvider = async ({params}: Request, res: Response) => {
    try {
        const {id} = params;
        const response = await deleteProviders(id);
        res.send(response);
    } catch (e) {
        handleHttp(res, "ERROR_DELETE_ITEMS")
    }
}

export {getProvider, getProviders, getSearchProvider, updateProvider, postProvider, deleteProvider};