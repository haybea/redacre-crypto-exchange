export interface Rate {
    id?: string;
    toCurrency : string;
    toAmount: number;
    fromCurrency : string;
    fromAmount: number;
    type?: string;
}