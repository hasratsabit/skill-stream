
import {UserModel} from './user.model';
import { Model } from 'mongoose';
import { User, IUserModel } from './user.interface';
import {Request} from 'express';

export class UserDal {
    private userModel: Model<IUserModel>
    constructor() {
        this.userModel = UserModel
    }

    create(req: Request): Promise<User> {
        try {
            return this.userModel.create(req.body);
        } catch (error) {
            throw error;
        }
    }
}


export class UserDalSingleton {
    static instance: UserDal;
    static getInstance(): UserDal {
        if(!UserDalSingleton.instance) UserDalSingleton.instance = new UserDal();
        return UserDalSingleton.instance;
    }
}