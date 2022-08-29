import express, { Express } from "express";
import { Server } from "http";
import { inject, injectable } from "inversify";
import { ILogger } from "./logger/logger.interface";
import { UserController } from "./users/users.controller";
import { TYPES } from "./types";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import 'reflect-metadata';

@injectable()
export class App {

    app: Express;
    server: Server;
    port: number;

    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.UserController) private userController: UserController,
        @inject(TYPES.IExeptionFilter) private exeptionFilter: IExeptionFilter
    ) {
        this.app = express();
        this.port = 8000;
    }

    useRoutes() {
        this.app.use('/users',this.userController.router);
    }

    useExeptionHandler() {
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
    }

    public async init() {
        this.useRoutes();
        this.useExeptionHandler();
        

        this.server = this.app.listen(this.port);
        this.logger.log(`Server are working on http://localhost:${this.port}/`);
    }
}