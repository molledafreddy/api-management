import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface RequestExt extends Request{
    user?: JwtPayload | { _id: string, role: string }   ;
}