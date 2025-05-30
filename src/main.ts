import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsOptions } from './options/corsOptions';
import setupSwagger from './options/swaggerOptions';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { NotFoundInterceptor } from './common/interceptors/not-found.interceptor';
import { FormatErrorPipe } from './common/pipes/format-error.pipe';
// import { CustomValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn', 'log']
    });

    app.enableCors(corsOptions);
    app.enableShutdownHooks();
    // app.setGlobalPrefix('api/v1');

    app.useGlobalPipes(new FormatErrorPipe());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new NotFoundInterceptor());

    setupSwagger(app);

    const port = process.env.PORT || 3000;
    await app.listen(port, () => {
        console.log(`Application is running on: ${port}`);
    });
}

bootstrap()
    .then(() => {
        console.log('Nest application started');
    })
    .catch((err) => {
        console.error('Nest application failed to start', err);
    });
