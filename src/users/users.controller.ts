import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller.js"
import { HTTPError } from "../errors/http-error.class.js";
import { ILogger } from "../logger/logger.interface.js";
import { TYPES } from "../types.js";


@injectable()
export class UserController extends BaseController {
    constructor(
        @inject(TYPES.ILogger) private loggerService: ILogger
    ) {
        super(loggerService);

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