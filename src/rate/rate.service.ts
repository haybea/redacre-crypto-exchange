import { Injectable,Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { map} from 'rxjs/operators';
import {catchError, firstValueFrom } from 'rxjs';
import { Rate } from './interfaces/rate.interface';
import { RateGateway } from './rate.gateway';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Interval, SchedulerRegistry } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { get_rate_url,api_interval } from '../config/keys';
import { OnModuleInit } from '@nestjs/common/interfaces/hooks';


@Injectable({})
export class RateService
//  implements OnModuleInit 
 {
    private readonly logger = new Logger('Rate');
    constructor(
        @InjectModel('Rate') private readonly rateModel:Model<Rate>, 
        private httpService: HttpService,
        private readonly rateGateway: RateGateway,
        private readonly configService: ConfigService,
        private readonly schedulerRegistry: SchedulerRegistry,  
    ){}

    async saveExchangedRate(rate :Rate): Promise<Rate>{
        const newRate = new this.rateModel(rate);
        const saveRate = await newRate.save();
        this.rateGateway.server.emit('new_rate', saveRate)
        return saveRate;
    }

    async getAll(): Promise<Rate[]>{
        return await this.rateModel.find().sort({createdAt: -1});
    }

    async getRateConversion(from? :string, to? :string) :Promise<Rate>{
        return await firstValueFrom(this.httpService
            .get<Rate>(`https://api.coingecko.com/api/v3/simple/price?ids=${from}&vs_currencies=${to}`)
            .pipe(
                map((response)=>response.data),
                // catchError((error: AxiosError) => {
                //     console.log(error);
                //     this.logger.error(error.response);
                //     throw 'An error happened!';
                // }),
                map((data)=>({
                    // price: data[from][to],
                    fromCurrency : from,
                    fromAmount: 1,
                    toCurrency : to,
                    toAmount: data[from][to],
                    type: 'Live Price',
                }))
            )
        );       
    }

    async getRateConversionAndSave(from:string,to: string){
        const rate = await this.getRateConversion(from,to)
        return await this.saveExchangedRate(rate);
    }

    @Interval(api_interval)
    async getRatesPeriodically(){
        let cryptoItems = ['bitcoin','ethereum'];
        const from = cryptoItems[Math.floor(Math.random()*cryptoItems.length)];
        
        let currencyItems = ['usd','eur','gbp','ngn'];
        const to = currencyItems[Math.floor(Math.random()*currencyItems.length)];
    
        return await this.getRateConversionAndSave(from,to);
    }
}