import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ResponseTimeInterceptor implements NestInterceptor {
    private readonly logger = new Logger('HTTP');

    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<unknown> {
        const startedAt = Date.now();
        const http = context.switchToHttp();
        const request = http.getRequest<Request & { method: string; url: string }>();
        const { method, url } = request;

        return next.handle().pipe(
            tap(() => {
                const response = http.getResponse<{ statusCode?: number }>();
                const statusCode = response?.statusCode ?? 200;
                const durationMs = Date.now() - startedAt;

                this.logger.log(
                    `${method} ${url} ${statusCode} +${durationMs}ms`,
                );
            }),
        );
    }
}