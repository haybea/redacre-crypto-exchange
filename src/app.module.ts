import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RateController } from './rate/rate.controller';
import { RateModule } from './rate/rate.module';
import { RateService } from './rate/rate.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_URL: Joi.required(),
        PORT: Joi.number().required(),
      }),
    }),
    ScheduleModule.forRoot(),
    RateModule, 
    MongooseModule.forRoot(process.env.DB_URL)],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
