import {PermissionDal, PermissionDalSingleton} from './permission.dal';
import {Permission} from './permission.interface'
import { Request, Response } from 'express';
import {ApiResponseHandler, IApiResponse} from '../../packages/ApiResponseHanlder';
import { MongoError } from 'mongodb';

export interface IResponse {
    statusCode?: number;
    message?: string;
    data?: any;
}

export class PermissionService {
    private permissionDal: PermissionDal;
    constructor() {
        this.permissionDal = PermissionDalSingleton.getInstance();
    }

    async insertPermission(req: Request, res: Response): Promise<IApiResponse>  {
        try {
            let permissionsArray = req.body;
            if(!permissionsArray || Object.keys(permissionsArray).length === 0) {
                return ApiResponseHandler.respond(res, {statusCode: 400, message: "One or more fields are missing."});
            }
            permissionsArray = !Array.isArray(permissionsArray) ? permissionsArray = [permissionsArray] : permissionsArray;
            let savedPermissions: Permission = await this.permissionDal.postPermissions(permissionsArray);
            if(!savedPermissions || Object.keys(savedPermissions).length === 0) {
                return ApiResponseHandler.respond(res, {message: 'Error occurred creating permission.', statusCode: 400});
            }

            return ApiResponseHandler.respond(res, {
                message: "Permission successfully created.", 
                statusCode: 201, 
                data: savedPermissions
            });
        } catch (error) {
            if(error instanceof MongoError && error.code === 11000) {
                return ApiResponseHandler.respond(res, {statusCode: 409, message: "Permission already exist."});
            }
            throw error;
        }
    }

    async getPermissionById(req: Request, res: Response): Promise<IApiResponse> {
        try {
            if(!req.params.id) return ApiResponseHandler.respond(res, {
                statusCode: 400,
                message: "No permission id was provided."
            })

            let permission = await this.permissionDal.findPermissions({_id: req.params.id});
            return ApiResponseHandler.respond(res, {statusCode: 200, data: permission});
        } catch (error) {
            throw error;
        }
    }

    async getPermissions(req: Request, res: Response): Promise<IApiResponse> {
        try {
            let permissionsArray: Permission[] = await this.permissionDal.findPermissions();
            if(!permissionsArray || permissionsArray.length === 0) {
                return ApiResponseHandler.respond(res, { statusCode: 404, message: "No permission is found.",})
            }
            return ApiResponseHandler.respond(res, {statusCode: 200, data: permissionsArray});
        } catch (error) {
            throw error;
        }
    }

    async deletePermission(req: Request, res: Response) {
        try {
            if(!req.body.ids) {
                return ApiResponseHandler.respond(res, {statusCode: 400, message: "No permission ids provided."});
            }
            let response = await this.permissionDal.deletePermissions(req.body.ids);
            res.send(response)
        } catch (error) {
            throw error;
        }
    }
    
}

export class PermissionServiceSingleton {
    static instance: PermissionService;
    static getInstance(): PermissionService {
        if(!PermissionServiceSingleton.instance) PermissionServiceSingleton.instance = new PermissionService();
        return PermissionServiceSingleton.instance;
    }
}