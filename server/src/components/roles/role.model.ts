
import mongoose from 'mongoose';
import { ModelEnum } from '../../constants/ModelEnums';

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    roleName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
        min: 3,
        max: 30
    },
    permissions: [{
        type: mongoose.SchemaTypes.ObjectId, 
        ref: ModelEnum.PERMISSIONS
    }]
}, {
    collection: ModelEnum.ROLES,
    timestamps: true
})

export const RoleModel = mongoose.model(ModelEnum.ROLES, RoleSchema);