import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IExeptionFilter } from './exeption.filter.interface';
import { HTTPError } from './http-error.class';
import 'reflect-metadata';

@injectable()
export class ExeptionFilter implements IExeptionFilter {
	constructor(@inject(TYPES.Logger) private logger: ILogger) {}

	catch(error: HTTPError | Error, req: Request, res: Response, next: NextFunction): void {
		if (error instanceof HTTPError) {
			this.logger.error(
				`Status: ${error.statusCode}. Message: ${error.message}. Context: ${error.context}`,
			);
			res.status(error.statusCode).send({ error: error.message });
		} else {
			this.logger.error(`Message: ${error.message}.`);
			res.status(500).send({ error: error.message });
		}
	}
}
