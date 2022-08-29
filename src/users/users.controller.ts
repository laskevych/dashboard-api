import { Request, Response, NextFunction } from "express";
import { BaseController } from "../common/base.controller.js"
import { HTTPError } from "../errors/http-error.class.js";
import { LoggerService } from "../logger/logger.service.js"

export class UserController extends BaseController {
    constructor(logger: LoggerService) {
        super(logger);

        this.bindRoutes([
            {
                path: "/login",
                method: "post",
                func: this.login
            },
            {
                path: "/register",
                method: "post",
                func: this.register
            },
        ]);
    }

    login(req: Request, res: Response, next: NextFunction) {
        next(new HTTPError(404, 'Authorization is bloked.'));
    }

    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'login');
    }
}