import { sign, verify } from "jsonwebtoken";
import UserModel from "../models/user";
const JWT_SECRET = process.env.JWT_SECRET || "token.010101010101";

const generateToken = async (user: any) => {
    const jwt = await sign(
        {
            _id: user._id,
            role: user.role
        }, 
        JWT_SECRET, 
        {
        expiresIn: "2h",
    });
    return jwt;
}

const verifyToken = (jwt: string) => {
    const isOk = verify(jwt, JWT_SECRET);
    return isOk;
}

export { generateToken, verifyToken }