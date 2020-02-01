import { User } from "./user.interface";
import { Request, Response } from "express";
import {UserDalSingleton, UserDal} from './user.dal';
import { ApiResponseHandler } from "../../packages/ApiResponseHanlder";
import { ValidationService, ValidationFeedback } from '../../services/validation.service';
import {userValidation} from './user.validation';
import { ErrorService } from '../../services/error.service';

export class UserService {
    private userDal: UserDal;
    constructor() {
        this.userDal = UserDalSingleton.getInstance();
    }

    async postUser(req: Request, res: Response) {
        try {
            let feedback: ValidationFeedback = ValidationService.validate(userValidation, req.body);
            if(!feedback.valid) {
                return res.send(feedback.message);
            }
            const user: User = await this.userDal.create(req);
            return ApiResponseHandler.respondWith200(res, "Account successfully created.", user);
        } catch (error) {
            return ErrorService.handleError(res, error);
        }
    }
}


export class UserServiceSingleton {
    static instance: UserService
    static getInstance(): UserService {
        if(!UserServiceSingleton.instance) UserServiceSingleton.instance = new UserService();
        return UserServiceSingleton.instance;
    }
}