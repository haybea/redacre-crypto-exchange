
export const api_interval = 600000; //in milli secs, 1000 is 1 second, 60000 is 1 minute, 600000 is 10 minute
export const base_url = 'https://api.coingecko.com/api/v3/';
export const get_rate_url = (from,to)=> `${base_url}simple/price?ids=${from}&vs_currencies=${to}`;
