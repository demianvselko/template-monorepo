import type { Params } from 'nestjs-pino';

export const loggerConfig: Params = {
    pinoHttp: {
        level: process.env.LOG_LEVEL ?? 'info',
        autoLogging: false,
        base: undefined,
        transport:
            process.env.NODE_ENV === 'development'
                ? {
                    target: 'pino-pretty',
                    options: {
                        colorize: true,
                        singleLine: true,
                        ignore: 'pid,hostname,context,req,res,level',
                        translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
                    },
                }
                : undefined,
    },
};