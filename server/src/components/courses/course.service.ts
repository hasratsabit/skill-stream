import { Course, CourseData } from "./course.interface";
import { Request, Response } from "express";
import { CourseDal, CourseDalSingleton } from "./course.dal";
import { IApiResponse, ApiResponseHandler } from "../../packages/ApiResponseHanlder";


export class CourseService {
    private courseDal: CourseDal
    constructor() {
        this.courseDal = CourseDalSingleton.getInstance();
    }

    async createCourse(req: Request, res: Response): Promise<IApiResponse> {
        try {
            let coursesArray = req.body;
            coursesArray = !Array.isArray(coursesArray) ? coursesArray = [coursesArray] : coursesArray;
            let courses = await this.courseDal.postCourse(coursesArray);
            return ApiResponseHandler.respond(res, {statusCode: 201, message: 'Successfully created', data: courses})
        } catch (error) {
            throw error;
        }
    }

    async getCourses(req: Request, res: Response): Promise<IApiResponse> {
        try {
            let response = await this.courseDal.findCourses(req);
            return ApiResponseHandler.respond(res, {statusCode: 200, data: response});
        } catch (error) {
            throw error;
        }
    }
}


export class CourseServiceSingleton {
    static instance: CourseService;
    static getInstance(): CourseService {
        if(!CourseServiceSingleton.instance) CourseServiceSingleton.instance = new CourseService();
        return CourseServiceSingleton.instance;
    }
}