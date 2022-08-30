import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;

	constructor(@inject(TYPES.Logger) protected loggerService: ILogger) {
		const result: DotenvConfigOutput = config();

		if (result.error) {
			this.loggerService.error('Can not impor configuration from .ENV.');
		} else {
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get<T extends string | number>(key: string): T {
		return this.config[key] as T;
	}
}
