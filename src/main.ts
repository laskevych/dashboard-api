import { App } from "./app";
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/users.controller";

async function bootstrap() {
    const logger = new LoggerService();
    const userController = new UserController(logger);
    const app = new App(logger, userController);
    await app.init();
}

bootstrap();