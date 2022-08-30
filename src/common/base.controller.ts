import { ILogger } from '../logger/logger.interface';
import { Router, Response } from 'express';
import { IControllerRoute, ExpressReturnType } from './route.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
	protected logger: ILogger;
	private readonly _router: Router;

	constructor(logger: ILogger) {
		this.logger = logger;
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 200, message);
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(
				`Init router. Method: ${route.method.toUpperCase()}; Path: ${route.path.toLocaleLowerCase()}`,
			);

			const handler = route.func.bind(this);

			this._router[route.method](route.path, handler);
		}
	}
}
