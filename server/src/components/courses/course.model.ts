
import mongoose from 'mongoose';
import { ModelEnum } from '../../constants/ModelEnums';
import { ICourse } from './course.interface';
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    title: {
        type: String, 
        required: true,
        index: true,
        trim: true,
        min: 3,
        max: 200,
    },
    description: {
        type: String, 
        required: true,
        trim: true,
        min: 3,
        max: 1000,
    },
    instructor: {
        type: String, 
        required: true,
        index: true,
        trim: true,
        min: 3,
        max: 30,
    },
    category: {
        type: String, 
        required: true,
        index: true,
        trim: true,
        min: 3,
        max: 30,
    },
    section: {
        type: String
    },
    size: {
        type: String
    },
    students: {
        type: Number
    },
    rating: {
        type: Number
    },
    status: {
        type: String,
        default: "Pending"
    }
}, {
    collection: ModelEnum.COURSES,
    timestamps: true
})

export const CourseModel = mongoose.model<ICourse>(ModelEnum.COURSES, CourseSchema);