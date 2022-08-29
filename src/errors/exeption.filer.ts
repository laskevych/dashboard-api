import { Request, Response, NextFunction } from "express";
import { LoggerService } from "../logger/logger.service";
import { IExeptionFilter } from "./exeption.fileter.interface";
import { HTTPError } from "./http-error.class";

export class ExeptionFilter implements IExeptionFilter {
    logger: LoggerService;

    constructor(logger: LoggerService) {
        this.logger = logger;
    }

    catch(error: HTTPError | Error, req: Request, res: Response, next: NextFunction) {
        if (error instanceof HTTPError) {
            this.logger.error(`Status: ${error.statusCode}. Message: ${error.message}. Context: ${error.context}`);
            res.status(error.statusCode).send( { error: error.message });
        } else {
            this.logger.error(`Message: ${error.message}.`);
            res.status(500).send( { error: error.message });
        }
    }
}