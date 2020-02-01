import { Application, Router} from "express";


const routesArray: string[] = [
    '../components/user/user.route',
    '../components/permissions/permission.route',
    '../components/courses/course.route',
    '../components/auth/auth.route'
]


export class RouteLoader {
    static load(app: Application, router: Router) {
        for(let routePath of routesArray) {
            let routeClass = require(routePath);
            let routeInstance = new routeClass(app);
            if(!routeInstance.register) throw new Error("No register method in this route.");
            app.use('/', routeInstance.register(router));
        }
    }
}