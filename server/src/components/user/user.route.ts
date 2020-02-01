
import express, { Request, Response, Application, Router } from 'express'
import {UserServiceSingleton, UserService} from './user.service';

class UserRoute {
    private app: express.Application;
    private userService: UserService;
    constructor(app: Application) {
        this.app = app;
        this.userService = UserServiceSingleton.getInstance();
    }

    register(router: Router): Router {
        this.app.post('/api/v1/user', this.postUser.bind(this));
        this.app.get('/api/v1/users', this.findUser.bind(this));
        this.app.get('/api/v1/user/:id', this.findUser.bind(this));
        this.app.put('/api/v1/user/:id', this.putUser.bind(this));
        this.app.delete('/api/v1/user/:id', this.deleteUser.bind(this));
        this.app.post('/api/v1/user/search', this.searchUser.bind(this));
        return router;
    }

    private postUser(req: Request, res: Response) {
        // res.json({success: true, message: "Works"});
        this.userService.postUser(req, res);
    }

    private findUser(req: Request, res: Response) {
        console.log("Getting all")
        res.json({ success: true, message: `Your param: ${req.params.id}, Your query: ${req.query.name}`})
    }

    private putUser(req: Request, res: Response) {
        res.send("Updating User");
    }

    private deleteUser(req: Request, res: Response) {
        res.send("Deleting user");
    }

    private searchUser(req: Request, res: Response) {
        res.send('Searching user');
    }
}

module.exports = UserRoute;