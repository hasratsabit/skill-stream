import { Response } from "express";

export interface IApiResponse {
    statusCode: number;
    message?: string;
    data?: any;
}


export class ApiResponseHandler {
    static respond(res: Response, config: IApiResponse): IApiResponse {
        return res.status(config.statusCode).json({status: config.statusCode || 201, message: config.message || '', data: config.data || {}});
    }

    // Ok
    static respondWith200(res: Response, message?: string, data?: any) {
        this.respond(res, {statusCode: 200, message: message || "Success", data});
    }

    // Created
    static respondWith201(res: Response, message?: string, data?: any) {
        this.respond(res, {statusCode: 201, message: message || "Successfully created", data});
    }

    // Bad Request
    static respondWith400(res: Response, message?: string, data?: any) {
        this.respond(res, {statusCode: 400, message: message || "Bad Request", data});
    }

    // Unauthorized
    static respondWith401(res: Response, message?: string, data?: any) {
        this.respond(res, {statusCode: 401, message: message || "You are not authorized", data});
    }

    // Forbidden
    static respondWith403(res: Response, message?: string, data?: any) {
        this.respond(res, {statusCode: 403, message: message || "Permission Denied", data});
    }

    // Not Found
    static respondWith404(res: Response, message?: string, data?: any) {
        this.respond(res, {statusCode: 404, message: message || "Resources Not Found", data});
    }

    // Server Error
    static respondWith500(res: Response, message?: string, data?: any) {
        this.respond(res, {statusCode: 500, message: message || "Internal Server Error", data});
    }

}