import { INestApplication, ValidationPipe } from '@nestjs/common';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import helmet from '@fastify/helmet';
import cookie from '@fastify/cookie';
import compress from '@fastify/compress';
import rateLimit from '@fastify/rate-limit';
import { ConfigService } from '@nestjs/config';

import { AppModule } from '../../../app.module';
import { setupSwagger } from '../config/swagger.config';
import type { AppConfig } from '../config/app.config';
import { ResponseTimeInterceptor } from '../interceptors/response-time.interceptor';

export class AppBootstrapFactory {
    static async create(): Promise<NestFastifyApplication & INestApplication> {
        const fastifyAdapter = new FastifyAdapter({
            logger: false,
            trustProxy: true,
        });

        const app = await NestFactory.create<NestFastifyApplication>(
            AppModule,
            fastifyAdapter,
        );

        await this.registerPlugins(app);
        this.configurePipes(app);
        this.configureInterceptors(app);
        this.configureCors(app);
        setupSwagger(app);

        return app;
    }

    private static async registerPlugins(
        app: NestFastifyApplication,
    ): Promise<void> {
        await app.register(helmet, {
            contentSecurityPolicy: false,
        });

        await app.register(cookie, {
            parseOptions: {
                httpOnly: true,
                sameSite: 'strict',
            },
        });

        await app.register(compress);
        await app.register(rateLimit, {
            max: 100,
            timeWindow: '1 minute',
        });
    }

    private static configurePipes(app: INestApplication): void {
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                transform: true,
                forbidNonWhitelisted: true,
                transformOptions: {
                    enableImplicitConversion: true,
                },
            }),
        );
    }

    private static configureInterceptors(app: INestApplication): void {
        app.useGlobalInterceptors(app.get(ResponseTimeInterceptor));
    }

    private static configureCors(app: INestApplication): void {
        const configService = app.get(ConfigService);
        const appConfig = configService.get<AppConfig>('app');

        if (!appConfig) {
            throw new Error('App configuration could not be loaded for CORS');
        }

        app.enableCors({
            origin: appConfig.frontendUrl,
            credentials: true,
        });
    }
}
