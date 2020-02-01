import { Router, Request, Response, Application } from "express";
import { UserService, UserServiceSingleton } from "../user/user.service";

export class AuthRoute {
    private app: Application;
    private userService: UserService;
    constructor(app: Application) {
        this.app = app;
        this.userService = UserServiceSingleton.getInstance();
    }

    register(router: Router): Router {
        this.app.post('/api/v1/auth/signup', this.signup.bind(this));
        this.app.post('/api/v1/auth/login', this.login.bind(this));
        return router;
    }

    signup(req: Request, res: Response) {
        this.userService.postUser(req, res);
    }

    login(req: Request, res: Response) {

    }
}


module.exports = AuthRoute;