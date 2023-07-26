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
const ObjectId = mongoose.Types.ObjectId;

const getCategoryProducts = async () => {

    const ObjectId = mongoose.Types.ObjectId;
    const id = new ObjectId("64adedb4035179d0b5492fe1");

    const responseItem = await categoryProduct.find({categoryProducts:{$ne: id}});
    // const responseItem = await categoryProduct.find({
    //     ciudad:{$ne: 'Madrid}
    // });
    return responseItem;
}

const insertCategory = async (category: category) => {
    const response = await categoryProduct.create(category);
    return response;
}

const getProducts = async (idCategory: string, clasification: string) => {
   
    try {
        const ObjectId = mongoose.Types.ObjectId;
        const id = new ObjectId(idCategory);
        const clasif = clasification;
        // const id = new ObjectId("648a1eb3320c2a5ac56fcdf5");
        console.log('llego por aca', clasif)
        let valid: any = {};
        
        // new ObjectId(_id)
        // categoryProducts: new ObjectId(id)
        valid = { status: true, categoryProducts: id, clasification:clasif};
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

const insertProductDelivery = async (delivery: RequestDeliveryOrder) => {
    
    const deliveryOrder: DeliveryOrder = {
        nameClient: delivery.nameClient,
        phone: delivery.phone,
        address: delivery.address,
        status: true
      }
    const responseInsert = await DeliveryOrderModel.create(deliveryOrder);
     if (responseInsert._id) {
        let dataDelivery: any = [];
        await delivery?.products?.forEach(
            (item) => {
                const productDelivery: ProductDelivery = {
                    products: item._id,
                    price: item.price,
                    quantity: item.quantity,
                    deliveryOrder: responseInsert._id as string,
                }
                dataDelivery.push(productDelivery);
        });
        
        const responseInsertP = await ProductDeliveryModel.insertMany(dataDelivery);
     }
    return delivery;
}

const insertProduct = async (product: Product) => {
    const responseInsert = await ProductModel.create(product);
    // return ['orden creada', responseInsertOrde]; 
    let vlaueId = responseInsert._id
    console.log('responseInsertOrder', vlaueId)
    // if (responseInsert._id) {
    //     let containerCategory: any = [];
    //     let data: any = product?.categoryProducts;
        // await data.forEach((element: RequestCategoryProduct)  => {
        //     const dataCategory: categoryHasProduct = {
        //         products: vlaueId as string,
        //         categoryProducts: element?.id as string
        //     }
            
        //     containerCategory.push(dataCategory)
        // });
        // const responseInsert = await categoryHasProductModel.create(containerCategory);
        console.log('responseInsert Logistinc', responseInsert)
    // }
    
    return responseInsert;
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

const getAccounts = async (query: any) => {
    let valid: any = {};
    const search =  query.search || null;
    const options = {
        populate: [{path: 'providers'}, {path: 'banks'}],
        page: parseInt(query.page, 10)  || 1,
        limit: parseInt(query.limit, 10) || 10
    }
    
    if (search != null) {
        valid = { providers: search }
    } 
    const responseItem = await AccountModel.paginate( valid, options );
    return responseItem;
}

const getAccount = async (id:string) => {
    const responseItem = await AccountModel.findOne({_id:id});
    return responseItem;
}

const insertAccount = async (account: Account) => {
    const response = await AccountModel.create(account);
    return response;
}

const updateAccount = async (id:string, data: Account) => {
    const responseItem = await AccountModel.findOneAndUpdate(
        {_id: id },
        data,
        { new: true }
    );
    
    return responseItem;
}

const deleteAccount = async (id:string) => {
    const responseItem = await AccountModel.remove({_id:id});
    return responseItem;
}

export { getCategoryProducts, insertCategory, getProducts, insertProduct, insertProductDelivery, getAccounts, getAccount, insertAccount, updateAccount, deleteAccount };