import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from './middleware.interface';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { HTTPError } from '../errors/http-error.class';

export class ValidateMiddleware implements IMiddleware {
	constructor(private classToValidate: ClassConstructor<Object>) {}

	execute(body: Request, res: Response, next: NextFunction): void {
		const instance = plainToClass(this.classToValidate, body);

		validate(instance).then((errors) => {
			if (errors.length > 0) {
				//next(new HTTPError(422, 'Incorrect data.'));
				res.status(422).send(errors);
			} else {
				next();
			}
		});
	}
}
