import { CategoryProduct as category } from "../interfaces/categoryProduct.interface";
import categoryProduct from "../models/categoryProduct";
import { Product } from "../interfaces/product.interface";
import ProductModel from "../models/products";
import AccountModel from "../models/account";
import mongoose from "mongoose";
import { RequestDeliveryOrder } from "../interfaces/request-delivery-order.interface";
import DeliveryOrderModel from "../models/deliveryOrder";
import { DeliveryOrder } from "../interfaces/deliveryOrder.interface";
import { ProductDelivery } from "../interfaces/product-delivery.interface";
import ProductDeliveryModel from "../models/productDelivery";
import { ResponsePagination } from "../interfaces/response-pagination.interface";
const ObjectId = mongoose.Types.ObjectId;

const getProductDeliveryId = async (id: string) => {
    
    const ObjectId = mongoose.Types.ObjectId;
    const _id = new ObjectId(id);

    let valid: any = {};
   
    let response: ResponsePagination = {
        docs: [],
        totalDocs:  0,
        limit: 1,
        totalPages: 0,
        page: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: true,
        prevPage: null ,
        nextPage: 0 
    }
    
    try {
        const ObjectId = mongoose.Types.ObjectId;
        valid = { _id: new ObjectId(_id)};
        const responseItem = await DeliveryOrderModel.aggregate([
            { $match: valid },
        ]);

       if (Object.entries(responseItem as any).length > 0) {
            response.docs = responseItem as any;
        }
        
        return response;
    } catch (error) {
        console.log('error', error)
        
    }
}

const getProductHasDelivery = async (id:string) => {
    const responseItem = await ProductDeliveryModel.find({deliveryOrder: id})
    .populate('products');
    
    return responseItem; 
}

const getProducts = async (idCategory: string, clasification: string, status: string) => {
   
    try {
        const ObjectId = mongoose.Types.ObjectId;
        const id = idCategory || null;
        const clasif = clasification || null;

        const st = status || null;
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
        console.log('valid', valid)
        const responseItem = await ProductModel.aggregate([
            { $match: valid },
            // { $lookup: { from:'egresses', localField: '_id', foreignField: 'orders',as:'egress'}},
            { $sort: { 'createdAt': -1 } },
        ]);
        
        return responseItem;
    } catch (error) {
        console.log('error', error)
        
    }
}

const getSearchProductDelivery = async (delivery: any) => {
    const ObjectId = mongoose.Types.ObjectId;
    
    let filter: any = {};
    
    const status = delivery.status || '';
    const page = parseInt(delivery.page, 10)  || 1;
    const limit = parseInt(delivery.limit, 10) || 10;
    // return order;
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
        nextPage: 0 ,
        sum: 0,
        paymentHasEgress: []
    }
    console.log('delivery.status', delivery.status)
    if (delivery.status !== '' && delivery.status != undefined) {
        filter.status = status;
    }

    // if ((delivery?.startDate !== 'null' && delivery?.startDate !== '')
    //     && (delivery?.endDate !== 'null' && delivery?.endDate !== '')) {
    //         console.log('imgreso a la validacion fecha', delivery.startDate)
    //     const myArray = delivery?.startDate.split("/");
    //     const myArray2 = delivery?.endDate.split("/");
    //     filter.paymentDate = {
    //         $gte: new Date(myArray[2], myArray[0]-1, myArray[1],0,0,0,0),
    //         $lt: new Date(myArray2[2],myArray2[0]-1, myArray2[1],23,59,59, 999)

    //     }
    // } else {
    //     console.log('ingrso al else')
    //     let now= new Date();

    //     const formatoMap = {
    //         dd: now.getDate(),
    //         mm: now.getMonth(),
    //         yyyy: now.getFullYear()
    //     };
    //     // var dateStr = new Date(formatoMap.yyyy,formatoMap.mm,formatoMap.dd,0,0,0,0);
    //     // var nextDate = new Date(formatoMap.yyyy,formatoMap.mm,formatoMap.dd,23,59,59, 999);
        
    //     filter.paymentDate = {
    //         // $gte: new Date(formatoMap.yyyy,formatoMap.mm,formatoMap.dd-2,23,59,59, 999), 
    //         // $lt:  new Date(formatoMap.yyyy,formatoMap.mm,formatoMap.dd,23,59,59, 999)
    //         $gte: new Date(formatoMap.yyyy,formatoMap.mm,formatoMap.dd,0,0,0,0), 
    //         $lt:  new Date(formatoMap.yyyy,formatoMap.mm,formatoMap.dd-1,23,59,59, 999)
    //     }
    // }

    console.log('filter', filter)
    try {
        const responseItem = await DeliveryOrderModel.aggregate(
            [
                { $match: filter},
                // { $lookup: { from:'egresses', localField: '_id', foreignField: 'orders',as:'egress'}},
                // { $lookup: { from:'paymentTypeHasEgress', localField: 'egress', foreignField: 'egress._id',as:'paymentTypeHasEgress'}},
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
            // const resultpayment = await getDinamicpayment(responseItem)
            let datapayment: any = [];
            // await responseItem?.forEach( async (element: any) => {
            //     await datapayment.push(element?.egress[0]?._id);
            // });
            // const res = await ProductDeliveryModel.find({egress: {$in:datapayment}});
            response.docs = responseItem;
            response.limit = limit;
            // response.paymentHasEgress = res;
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
        nameClient: delivery?.nameClient,
        phone: delivery?.phone,
        address: delivery?.address,
        status: "activo"
    }

    const responseInsert = await DeliveryOrderModel.create(deliveryOrder);
     if (responseInsert._id) {
        let dataDelivery: any = [];
        delivery?.products?.forEach(
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
    return delivery;
}


const updateProductDelivery = async (id:string, data: RequestDeliveryOrder) => {
    const responseItem = await DeliveryOrderModel.findOneAndUpdate(
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

export { updateProductDelivery, getProductHasDelivery, getProductDeliveryId, getSearchProductDelivery, getProducts, insertProductDelivery };