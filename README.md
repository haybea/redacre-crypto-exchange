# redacre-crypto-exchange
This is a crypto-currency exchange Api. The application consists of a React front-end client and a Node back-end
service (Nest.js). The frontend can be found here https://github.com/haybea/redacre-crypto-widget

## Getting Started
These instructions will get you a copy of the project up and running on your local machine.

### Install
Clone the git repository on your computer

```$ git clone https://github.com/haybea/redacre-crypto-exchange.git```


You can also download the entire repository as a zip file and unpack in on your computer if you do not have git

## Set Up the application
To run the app, open your terminal and run the following

```
    $ cd redacre-crypto-exchange
    $ npm install
    $ copy .env.example .env
```
## .env file
Here you can change the database connection string (DB_URL) and the Port (PORT) to serve the app. If you change the PORT, make sure, you follow the instructions to change the port on the frontend too.

## Run the application
```
    $ npm run start
```

## Configure Live Exchange API rate limit

If you want to change the interval at which the Back-end service consume the exchange rates from the API, locate the file ```src/config/keys.ts``` and change the value of ```api_interval```. The value is in milli seconds.
The default is 10 minutes. 

## Built With
* [NestJS](https://nestjs.com) - A progressive Node.js framework

