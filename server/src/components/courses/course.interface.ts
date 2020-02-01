import * as mongoose from 'mongoose';

export interface Course {
    title?: string;
    description?: string;
    instructor?: string;
    category?: string;
    section?: number;
    size?: string;
    students?: number;
    rating?: number;
    status?: string;
    price?: number;
  }

  export interface CourseData {
    totalCourses: number;
    courses: Course[];
  }


  export interface ICourse extends Course, mongoose.Document {}