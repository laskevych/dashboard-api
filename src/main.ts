import { App } from "./app";
import { ExeptionFilter } from "./errors/exeption.filer";
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/users.controller";

async function bootstrap() {
    const logger = new LoggerService();
    const userController = new UserController(logger);
    const exeptionFilter = new ExeptionFilter(logger);
    const app = new App(logger, userController, exeptionFilter);
    await app.init();
}

bootstrap();