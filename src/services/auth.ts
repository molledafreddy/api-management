import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import UserModel from "../models/user";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

const registerNewUser = async ({email, password, name}: User) => {
    const checkIs = await UserModel.findOne({email});
    if (checkIs) return "ALREAY_USER";
    const passHash = await encrypt(password);

    const registerNewUser = await UserModel.create({email, password: passHash, name}); 
    return registerNewUser; 
};

const loginUser = async ({email, password}: Auth) => {
    const checkIs = await UserModel.findOne({ email });
    console.log('checkis', checkIs);
    if (!checkIs) return "NOT_FOUND_USER";
    
    const passwordHash = checkIs!.password;
    const isCorrect = await verified(password, passwordHash);

    if (!isCorrect) return "NOT_FOUND_USER";
    
    const token = await generateToken(checkIs);
    console.log('usuario encontrado', token);
    const data = {
        token,
        user: checkIs
    };
    
    return data;
    //Todo el encriptado
};

export {registerNewUser, loginUser}