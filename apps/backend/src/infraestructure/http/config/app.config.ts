import { registerAs } from '@nestjs/config';
import type { ConfigType } from '@nestjs/config';

export const appConfig = registerAs('app', () => {
    const port = Number(process.env.PORT ?? 4000);

    return {
        port: Number.isNaN(port) ? 4000 : port,
        host: process.env.HOST ?? '0.0.0.0',
        frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
        nodeEnv: (process.env.NODE_ENV ?? 'development') as
            | 'development'
            | 'local'
            | 'production',
    };
});

export type AppConfig = ConfigType<typeof appConfig>;