import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import UserModel from "../models/user";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

const registerNewUser = async ({email, password, name,role}: User) => {
    const dataEmail = email.toLowerCase()
    console.log('dataEmail',dataEmail)
    const checkIs = await UserModel.find({email:dataEmail});
    console.log('checkIs', checkIs)
    if (checkIs.length > 0) return "ALREAY_USER";
    const passHash = await encrypt(password);

    const registerNewUser = await UserModel.create({email: dataEmail, password: passHash, name, role}); 
    console.log('registerNewUser', registerNewUser)
    return registerNewUser; 
};

const loginUser = async ({email, password}: Auth) => {
    // const checkIs = await UserModel.findOne({ email });
    const dataEmail = email.toLowerCase()
    const checkIs = await UserModel.find({email:dataEmail});
    if (checkIs?.length === 0) return "NOT_FOUND_USER";
    
    const passwordHash = checkIs[0]?.password;
    const isCorrect = await verified(password, passwordHash);
    if (!isCorrect) return "NOT_FOUND_USER";
    
    const token = await generateToken(checkIs[0]);
    const data = {
        token,
        user: checkIs[0]
    };
    
    return data;
    //Todo el encriptado
};

export {registerNewUser, loginUser}