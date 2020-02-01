import * as mongoose from 'mongoose';


export interface Permission {
    permission: string;
    description: string;
    createdAt?: Date
    updatedAt?: Date;
}


export interface IPermission extends Permission, mongoose.Document {}