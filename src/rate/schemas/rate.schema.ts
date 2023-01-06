import * as mongoose from 'mongoose';

export const RateSchema = new mongoose.Schema({
    fromCurrency: {type: String},
    toCurrency: {type: String},
    fromAmount: {type: Number},
    toAmount: {type: Number},
    type: {type: String, default: 'Exchanged'}
},{
    timestamps:true,
});