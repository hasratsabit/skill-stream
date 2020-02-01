
import * as mongoose from 'mongoose'

export interface User {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    createdAt?: Date
}

export interface IUserModel extends User, mongoose.Document {}