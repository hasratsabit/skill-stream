
import {PermissionService, PermissionServiceSingleton} from './permission.service'
import { Application, Router, Request, Response } from 'express';

export class PermissionRoute {
    private permissionService: PermissionService;
    private app: Application
    constructor(app: Application) {
        this.app = app;
        this.permissionService = PermissionServiceSingleton.getInstance();
    }

    register(router: Router): Router {
        this.app.post('/api/v1/permissions', this.postPermission.bind(this));
        this.app.get('/api/v1/permissions', this.getPermissions.bind(this));
        this.app.delete('/api/v1/permissions', this.deletePermission.bind(this));
        this.app.get('/api/v1/permission/:id', this.getPermissionById.bind(this));
        return router;
    }

    private postPermission(req: Request, res: Response) {
        this.permissionService.insertPermission(req, res);
    }

    private getPermissionById(req: Request, res: Response) {
        this.permissionService.getPermissionById(req, res);
    }

    private getPermissions(req: Request, res: Response) {
        this.permissionService.getPermissions(req, res);
    }

    private deletePermission(req: Request, res: Response) {
        this.permissionService.deletePermission(req, res);
    }
}


module.exports = PermissionRoute;