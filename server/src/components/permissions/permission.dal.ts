import {Model} from 'mongoose';
import { IPermission, Permission } from './permission.interface';
import { PermissionModel } from './permission.model';


export class PermissionDal {
    private permissionModel: Model<IPermission>
    constructor() {
        this.permissionModel = PermissionModel;
    }

    async postPermissions(permissions: Permission | Permission[]): Promise<Permission> {
        try {
            return this.permissionModel.insertMany(permissions);
        } catch (error) {
            throw error;
        }
    }

    async findPermissions(options?: any): Promise<Permission[]> {
        try {
            let query = options || {};
            return this.permissionModel.find(query).lean();
        } catch (error) {
            throw error;
        }
    }

    async updatePermission(permissionId: string, permission: Permission): Promise<any> {
        try {
            return this.permissionModel.findByIdAndUpdate(permissionId, permission);
        } catch (error) {
            throw error;
        }
    }

    async deletePermissions(permissionIds: string[]): Promise<any> {
        try {
            return this.permissionModel.deleteMany({_id: permissionIds});
        } catch (error) {
            throw error;
        }
    }

}


export class PermissionDalSingleton {
    static instance: PermissionDal
    static getInstance(): PermissionDal {
        if(!PermissionDalSingleton.instance) PermissionDalSingleton.instance = new PermissionDal();
        return PermissionDalSingleton.instance;
    }
}