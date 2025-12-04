import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { appConfig } from './infraestructure/http/config/app.config';
import { ResponseTimeInterceptor } from './infraestructure/http/interceptors/response-time.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ResponseTimeInterceptor],
})
export class AppModule { }
