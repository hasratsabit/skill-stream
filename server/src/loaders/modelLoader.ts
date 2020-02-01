import mongoose, { Document, Model } from "mongoose";


const modelsPath: string[] = [
    '../components/user/User.model.ts'
]

export interface MongoDocument {
    name: string;
    model: mongoose.Model<mongoose.Document>;
}

export class ModelLoader {
    static load(): Map<string, Model<Document>> {
        try {
            let models: Map<string, Model<Document>> = new Map()
            for(let model of modelsPath) {
                let requiredModel = require(model);
                if(!requiredModel.loadModel) {
                    throw new Error("loadModel method is missing.");
                }
                let loadedModel: MongoDocument = requiredModel.loadModel();
                models.set(loadedModel.name, loadedModel.model);
            }
            return models; 
        } catch (error) {
            throw error;
        }
    }
}