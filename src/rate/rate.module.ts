import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import {MongooseModule} from '@nestjs/mongoose';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';
import { RateSchema } from './schemas/rate.schema';
import { RateGateway } from './rate.gateway';

@Module({
    imports: [
        HttpModule.register({
            timeout: 60000,
            maxRedirects: 5,
        }),
        MongooseModule.forFeature([{name: 'Rate', schema: RateSchema}])
    ],
    controllers:[RateController],
    providers: [RateService, RateGateway],
    exports : [RateService]
})
export class RateModule{

}