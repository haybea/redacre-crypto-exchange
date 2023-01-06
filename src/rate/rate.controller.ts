import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { RateService } from "./rate.service";
import { CreateRateDto} from "./dto/create_rate.dto";
import { Rate } from "./interfaces/rate.interface";

@Controller('rate')
export class RateController {
    constructor(private rateService: RateService){}

    // @Get('getrate/from/:from/to/:to')
    // getRateConversion(@Param() param){
    //     return this.rateService.getRateConversion(param.from, param.to);
    // }

    @Get('from/:from/to/:to')
    getRateConversionAndSave(@Param() param){
        return this.rateService.getRateConversionAndSave(param.from, param.to);
    }

    @Get('all')
    getAll(): Promise<Rate[]>{
        return this.rateService.getAll();
    }

    @Post('save')
    saveExchangedRate(@Body() createRateDto: CreateRateDto): Promise<Rate> {
        return this.rateService.saveExchangedRate(createRateDto);
    }
}