import { IsNotEmpty ,IsString,IsNumber} from "class-validator";

export class CreateRateDto{
    @IsString()
    @IsNotEmpty()
    readonly fromCurrency: string;

    @IsString()
    @IsNotEmpty()
    readonly toCurrency: string;

    @IsNumber()
    @IsNotEmpty()
    readonly fromAmount: number;

    @IsNumber()
    @IsNotEmpty()
    readonly toAmount: number;
}