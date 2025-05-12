import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { corsOptions } from './options/corsOptions';
import setupSwagger from './options/swaggerOptions';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { NotFoundInterceptor } from './common/interceptors/not-found.interceptor';
// import { CustomValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn', 'log']
    });

    app.enableCors(corsOptions);
    app.enableShutdownHooks();
    // app.setGlobalPrefix('api/v1');

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // this will strip away any properties that don't have decorators
            forbidNonWhitelisted: true // this will throw an error if extra properties are sent
        })
    );

    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: (errors) => {
                const formattedErrors = errors.reduce((acc, error) => {
                    acc[error.property] = Object.values(error.constraints || {});
                    return acc;
                }, {});
                return new BadRequestException({
                    statusCode: 400,
                    message: 'Validation failed',
                    errors: formattedErrors
                });
            }
        })
    );

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
