import mongoose from 'mongoose';
import { ModelEnum } from '../../constants/ModelEnums';
import { BcryptService } from '../../packages/BcryptService';
import { IUserModel } from './user.interface';

const Schema = mongoose.Schema;

const UserSchema: mongoose.Schema  = new Schema({
    firstName: { 
        type: String, 
        required: true,
        index: true, 
        trim: true,
        minlength: 2,
        maxlength: 30
    },
    lastName: { 
        type: String, 
        required: true,
        index: true, 
        trim: true,
        minlength: 2,
        maxlength: 30
    },
    username: { 
        type: String, 
        required: true,
        index: true, 
        trim: true, 
        lowercase: true, 
        unique: true,
        minlength: 5,
        maxlength: 30
    },
    email: { 
        type: String, 
        required: true, 
        trim: true, 
        unique: true,
        minlength: 2,
        maxlength: 30,
    },
    password: { 
        type: String, 
        required: true, 
        trim: true,
        minlength: 2,
        maxlength: 30,
    },
    roles: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: ModelEnum.ROLES,
    }]
}, {
    collection: ModelEnum.USERS, 
    timestamps: true
});




UserSchema.pre("save", async function(next) {
    try {
        let user: any = this;
        if(!this.isModified("password")) return next();
        user.password = await BcryptService.hashPassword(user.password);
        next();
    } catch (error) {
        throw error;
    }
})



export const UserModel = mongoose.model<IUserModel>(ModelEnum.USERS, UserSchema);