
import {CourseModel} from './course.model';
import { Model } from 'mongoose';
import { ICourse, Course } from './course.interface';
import { Request } from 'express';
import { RequestService } from '../../services/request.service';


export class CourseDal {
    private courseModel: Model<ICourse>
    constructor() {
        this.courseModel = CourseModel;
    }

    async postCourse(courses: Course | Course[]): Promise<Course | Course[]> {
        try {
            return this.courseModel.insertMany(courses);
        } catch (error) {
            throw error;
        }
    }


    async findCourses(req: Request) {
        try {
            let {limit, skip, sort} = RequestService.normalizeRequest(req);
            let sortBy = req.query.sortBy || 'title'
            let totals = this.courseModel.countDocuments().lean(); 
            let courseData =  this.courseModel.find().sort({[sortBy]: sort}).skip(skip).limit(limit).lean()
            let [totalCourses, courses] = await Promise.all([totals, courseData]);
            if((!courses || courses.length === 0) || (!totalCourses || totalCourses.length === 0)) {
                throw new Error("No data was found.");
            }
            let data = {totalCourses, courses};
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export class CourseDalSingleton {
    static instance: CourseDal
    static getInstance(): CourseDal {
        if(!CourseDalSingleton.instance) CourseDalSingleton.instance = new CourseDal();
        return CourseDalSingleton.instance;
    }
}