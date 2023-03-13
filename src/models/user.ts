// import { Schema, Types, model, Model } from "mongoose";
import  mongoose, { Schema, Types, model, Model } from "mongoose";
import { User } from "../interfaces/user.interface";

const UserSchema: Schema = new Schema <User> (
    {
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type:String,
            unique: true,
            required: true
        },
        description: {
            type: String,
            default: "soy la descripcion",
        },
        role: {
            type: String,
            default: 'User',
            required: true
        }
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);

const UserModel = model('users', UserSchema);
export default UserModel;