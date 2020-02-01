import express, { Application } from 'express';
import {MongoConnect} from '../db/MongoConnect';
import * as dotenv from 'dotenv';
import {RouteLoader} from '../loaders/routeLoader';
import * as bodyParser from 'body-parser';
import cors from 'cors';


class ExpressServer {
    private app: Application;
    constructor() {
      this.app = express(); 
      this.start(); 
    }

    async start() {
        dotenv.config();
        this.startServer();
        await MongoConnect.connect();
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
        this.app.use(cors())
        RouteLoader.load(this.app, express.Router());
    }


    private startServer(): void {
        const port: any = process.env.PORT || 8080;
        this.app.listen(port, () => {
            console.log(`Listening to port ${port}`);
        })
    }
}

export class ServerSingleton {
    static instance: any;
    static getInstance(): any {
        if(!ServerSingleton.instance) ServerSingleton.instance = new ExpressServer();
        return ServerSingleton.instance;
    }
}
