import mongoose from 'mongoose';


export class MongoConnect {
    static async connect() {
        try {
           await mongoose.connect(`${process.env.MONGO_URI}`, {useNewUrlParser: true, useCreateIndex: true});
           console.log("Database successfully connected");
        } catch (error) {
            throw error;
        }
    }
}