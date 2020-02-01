import { Application, Request, Response, Router } from "express";
import { CourseService, CourseServiceSingleton } from "./course.service";


export class CourseRoute {
    private app: Application;
    private courseService: CourseService;
    constructor(app: Application) {
        this.app = app;
        this.courseService = CourseServiceSingleton.getInstance();
    }

    register(router: Router): Router {
        this.app.post('/courses', this.postCourse.bind(this));
        this.app.get('/courses', this.findCourses.bind(this));
        return router;
    }

    private postCourse(req: Request, res: Response) {
        this.courseService.createCourse(req, res);
    }

    private findCourses(req: Request, res: Response) {
        this.courseService.getCourses(req, res);
    }
} 

module.exports = CourseRoute;