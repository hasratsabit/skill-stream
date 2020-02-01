import * as mongoose from 'mongoose';
import { ModelEnum } from '../../constants/ModelEnums';
import { IPermission } from './permission.interface';
const Schema = mongoose.Schema;

const PermissionSchema = new Schema({
    permission: {
        type: String, 
        required: true,
        unique: true,
        index: true,
        trim: true,
        min: 3,
        max: 30,
    },
    description: {
        type: String,
        min: 5,
        max: 200
    }
}, {
    collection: ModelEnum.PERMISSIONS,
    timestamps: true
})

export const PermissionModel = mongoose.model<IPermission>(ModelEnum.PERMISSIONS, PermissionSchema);