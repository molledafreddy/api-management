import { Account } from "../interfaces/account.interface";
import { CategoryProduct as category } from "../interfaces/categoryProduct.interface";
import categoryProduct from "../models/categoryProduct";
import { Product } from "../interfaces/product.interface";
import ProductModel from "../models/products";
import AccountModel from "../models/account";
import { getProvider } from "./provider";
import { getWorkingForDate, insertWorkingDay } from "./workingDay";
import mongoose from "mongoose";
import { categoryHasProduct } from "../interfaces/category-has-product.interface";
import categoryHasProductModel from "../models/categoryHasProduct";
import { RequestCategoryProduct } from "../interfaces/request-category-product.interface";
import { RequestDeliveryOrder } from "../interfaces/request-delivery-order.interface";
import DeliveryOrderModel from "../models/deliveryOrder";
import { DeliveryOrder } from "../interfaces/deliveryOrder.interface";
import { ProductDelivery } from "../interfaces/product-delivery.interface";
import ProductDeliveryModel from "../models/productDelivery";
import { ResponsePagination } from "../interfaces/response-pagination.interface";
const ObjectId = mongoose.Types.ObjectId;

const getCategoryProducts = async () => {

    const ObjectId = mongoose.Types.ObjectId;
    const id = new ObjectId("64adedb4035179d0b5492fe1");

    const responseItem = await categoryProduct.find({categoryProducts:{$ne: id}});
    return responseItem;
}

const getProductId = async (id: string) => {

    const ObjectId = mongoose.Types.ObjectId;
    const _id = new ObjectId(id);
    const responseItem = await ProductModel.findOne({_id:_id});
    return responseItem;

    // const responseItem = await categoryProduct.find({categoryProducts:{$ne: id}});
    // const responseItem = await categoryProduct.find({
    //     ciudad:{$ne: 'Madrid}
    // });
    // return responseItem;
}

const getAllCategoryProducts = async () => {

    const responseItem = await categoryProduct.find();
    return responseItem;
}

const getSearchCategory = async (query: any) => {
    let filter: any = {};
    const page = parseInt(query.page, 10)  || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const search = query.search || null;
    let response: ResponsePagination = {
        docs: [],
        totalDocs:  0,
        limit: limit,
        totalPages: 0,
        page: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: true,
        prevPage: null ,
        nextPage: 0 
    }
    const options = {
        page: parseInt(query.page, 10)  || 1,
        limit: parseInt(query.limit, 10) || 10
    }
   
    if (search != null) {
        filter = {
            $text:{
                $search: `\"${search}\" authority key`
            }
        }
    } 
    
    // const responseItem = await ProductModel.paginate( valid, options );
    // if (Object.entries(responseItem).length > 0) {
    //     response.docs = responseItem;
    //     response.totalDocs = responseItem[0].totalDocs;
    //     response.limit = limit;
    //     response.totalPages = Math.ceil( responseItem[0].totalDocs / limit );
    //     response.page = (page - 1) * limit || 0;
    //     response.prevPage = page;
    //     response.nextPage = (page + 1);
    // }
    // return response;
    // return responseItem;


    try {
        const responseItem = await ProductModel.aggregate(
            [
                { $match: filter},
                // { $lookup: { from:'categoryProducts', localField: '_id', foreignField: 'orders',as:'categoryProducts'}},
                // { $lookup: { from:'logisticorders', localField: '_id', foreignField: 'orders',as:'logisticOrder'}},
                // { $lookup: { from:"providers", localField: "providers", foreignField: "_id", as: "providers"},},
                {
                    $setWindowFields: {
                        output: { 
                            totalDocs: { $count: {} },
                        },
                    },
                },
                { $sort: { 'createdAt': -1 } },
                { $skip: (page - 1) * limit || 0 },
                { $limit: Number(limit) },
            ]
        );

        if (Object.entries(responseItem).length > 0) {
            response.docs = responseItem;
            response.totalDocs = responseItem[0].totalDocs;
            response.limit = limit;
            response.totalPages = Math.ceil( responseItem[0].totalDocs / limit );
            response.page = (page - 1) * limit || 0;
            response.prevPage = page;
            response.nextPage = (page + 1);
        }
    return response;
    } catch (e) {
        console.log(e)
    }
}

const insertCategory = async (category: category) => {
    const response = await categoryProduct.create(category);
    return response;
}

const getProducts = async (idCategory: string, clasification: string, status: string) => {
   
    try {
        const ObjectId = mongoose.Types.ObjectId;
        const id = idCategory || null;
        const clasif = clasification || null;

        const st = status || null;
        // const id = new ObjectId("648a1eb3320c2a5ac56fcdf5");
        console.log('llego por aca', clasif)
        let valid: any = {};
        
        if (id !== null) {
            valid.categoryProducts = new ObjectId(id) ;
        } 

        if (clasif !== null) {
            valid.clasification = clasif ;
        }
        
        if (st !== null) {
            valid.status = true ;
        } else {
            valid.status = false ;
        }
        // new ObjectId(_id)
        // categoryProducts: new ObjectId(id)
        // valid = { status: true, clasification:clasif};
        console.log('valid', valid)
        const responseItem = await ProductModel.aggregate([
            { $match: valid },
            // { $lookup: { from:'egresses', localField: '_id', foreignField: 'orders',as:'egress'}},
            { $sort: { 'createdAt': -1 } },
        ]);

    //    if (Object.entries(responseItem as any).length > 0) {
    //         response.docs = responseItem as any;
    //     }
        
        return responseItem;
    } catch (error) {
        console.log('error', error)
        
    }
    // console.log('getProductsgetProducts')
    // const responseItem = await ProductModel.find({status:true, categoryProducts: "648a1eb3320c2a5ac56fcdf5"});
    // return responseItem;

    // let valid: any = {};
    // const options = {
    //     // populate: [{path: 'providers'}, {path: 'banks'}],
    //     page: 1,
    //     limit: 10
    // }

    // const responseItem = await ProductModel.paginate( valid, options );
    // return responseItem;
}

const getSearchProduct = async (query: any) => {
    let filter: any = {};
    const page = parseInt(query.page, 10)  || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const search = query.search || null;
    let response: ResponsePagination = {
        docs: [],
        totalDocs:  0,
        limit: limit,
        totalPages: 0,
        page: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: true,
        prevPage: null ,
        nextPage: 0 
    }
    const options = {
        page: parseInt(query.page, 10)  || 1,
        limit: parseInt(query.limit, 10) || 10
    }
   
    if (search != null) {
        filter = {
            $text:{
                $search: `\"${search}\" authority key`
            }
        }
    } 
    
    // const responseItem = await ProductModel.paginate( valid, options );
    // if (Object.entries(responseItem).length > 0) {
    //     response.docs = responseItem;
    //     response.totalDocs = responseItem[0].totalDocs;
    //     response.limit = limit;
    //     response.totalPages = Math.ceil( responseItem[0].totalDocs / limit );
    //     response.page = (page - 1) * limit || 0;
    //     response.prevPage = page;
    //     response.nextPage = (page + 1);
    // }
    // return response;
    // return responseItem;


    try {
        const responseItem = await ProductModel.aggregate(
            [
                { $match: filter},
                // { $lookup: { from:'categoryProducts', localField: '_id', foreignField: 'orders',as:'categoryProducts'}},
                // { $lookup: { from:'logisticorders', localField: '_id', foreignField: 'orders',as:'logisticOrder'}},
                // { $lookup: { from:"providers", localField: "providers", foreignField: "_id", as: "providers"},},
                {
                    $setWindowFields: {
                        output: { 
                            totalDocs: { $count: {} },
                        },
                    },
                },
                { $sort: { 'createdAt': -1 } },
                { $skip: (page - 1) * limit || 0 },
                { $limit: Number(limit) },
            ]
        );

        if (Object.entries(responseItem).length > 0) {
            response.docs = responseItem;
            response.totalDocs = responseItem[0].totalDocs;
            response.limit = limit;
            response.totalPages = Math.ceil( responseItem[0].totalDocs / limit );
            response.page = (page - 1) * limit || 0;
            response.prevPage = page;
            response.nextPage = (page + 1);
        }
    return response;
    } catch (e) {
        console.log(e)
    }
}

const insertProductDelivery = async (delivery: RequestDeliveryOrder) => {
    
    const deliveryOrder: DeliveryOrder = {
        nameClient: delivery.nameClient,
        phone: delivery.phone,
        address: delivery.address,
        status: 'activo'
      }
      console.log('deliveryOrder', deliveryOrder)
    const responseInsert = await DeliveryOrderModel.create(deliveryOrder);
    console.log(' responseInsert result', responseInsert)
     if (responseInsert._id) {
        let dataDelivery: any = [];
        await delivery?.products?.forEach(
            (item) => {
                const productDelivery: ProductDelivery = {
                    products: item?._id,
                    price: item?.price,
                    quantity: item?.quantity,
                    deliveryOrder: responseInsert._id as string,
                }
                dataDelivery.push(productDelivery);
        });
        
        const responseInsertP = await ProductDeliveryModel.insertMany(dataDelivery);
     }
    return responseInsert;
}

const insertProduct = async (product: Product) => {
    const responseInsert = await ProductModel.create(product);
    let vlaueId = responseInsert._id
    
    return responseInsert;
}

const updateProduct = async (id:string, data: Account) => {
    const responseItem = await ProductModel.findOneAndUpdate(
        {_id: id },
        data,
        { new: true }
    );
    
    return responseItem;
}

const getSearchProducts = async (query: any) => {
    // const responseItem = await AccountModel.find({});
    // return responseItem;

    let valid: any = {};
    const search = query.search || null;
    const options = {
        populate: [{path: 'providers'}, {path: 'banks'}],
        page: parseInt(query.page, 10)  || 1,
        limit: parseInt(query.limit, 10) || 10
    }

    if (search != null) {
        valid = {
            $text:{
                $search: `\"${search}\" authority key`
            }
        }
    } 

    
    
    const responseItem = await AccountModel.paginate( valid, options );
    return responseItem;
}

export { getCategoryProducts, updateProduct, getProductId, getAllCategoryProducts, getSearchProduct, insertCategory, getProducts, insertProduct, insertProductDelivery };