import { MongoError } from "mongodb";
import { Response } from "express";


export class ErrorService {
    static handleError(res: Response, error: any) {
        if(error instanceof MongoError) {
            if(error.code === 11000) {
                return res.status(409).json({
                    success: false, 
                    message: "The entry already exist."
                });
            }
        }
        return res.send(error);
    }
}