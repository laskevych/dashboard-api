import { LoggerService } from "../logger/logger.service";
import { Router, Response } from "express";
import { IControllerRoute } from "./route.interface";

export abstract class BaseController {
    private logger: LoggerService;
    private readonly _router: Router;

    constructor(logger: LoggerService) {
        this.logger = logger;
        this._router = Router();
    }

     get router() {
        return this._router;
     }

     public send<T>(res: Response, code: number, message: T) {
        res.type('application/json');
        return res.status(code).json(message);
     }

     public ok<T>(res: Response, message: T) {
        return this.send<T>(res, 200, message);
     }

     protected bindRoutes(routes: IControllerRoute[]) {
        for (const route of routes) {
            this.logger.log(`Init router. Method: ${route.method.toUpperCase()}; Path: ${route.path.toLocaleLowerCase()}`)

            const handler = route.func.bind(this);

            this._router[route.method](route.path, handler);
        }
     }
}