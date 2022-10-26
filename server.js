'use strict';

console.log('Yoo, My first server!');

// const {response, request} = require('express');
// ****** REQUIRES *******
const express = require('express');

require('dotenv').config();

let data = require('./data/weather.json');

const cors = require('cors');


// once express is in we need to use it - per express docs
// app === server
const app = express();

// const cors = require('cors');
app.use(cors());


// define my port
const PORT = process.env.PORT || 3002;
// 3002 - if my server is up on 3002, then i know there something wrong with my .env file or i don't bring in dotenv library


// ****** BASE END POINTS ********

app.get('/', (request, response) => {
  console.log('This is showing up in my terminal!');
  response.status(200).send('Welcome to my server');
});

app.get('/hello', (request, response) => {
  console.log(request.query);
  let firstName = request.query.firstName;
  let lastName = request.query.lastName;
  response.status(200).send(`Hello ${firstName} ${lastName}! Welcome to my server!`);
});

app.get('/weather', (request, response, next) => {
  let cityName = request.query.cityName;
  let lat = request.query.lat;
  let lon = request.query.lon;

  try{

    let cityData = data.find(city => city.city_name === cityName);
    let ForecastList = cityData.data.map(element => new Forecast(element));
    response.status(200).send(ForecastList);
  } catch(error) {
    next(error);
    response.status(500).send(error.message);
  }
});


class Forecast {
  constructor(ForecastData) {
    this.data = ForecastData.datetime;
    this.description = ForecastData.weather.description
  }
}

// catch all and should live at the bottom
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

// ****** ERROR HANDLING ********




// ******* SERVER START ********
app.listen(PORT, () => console.log(`We are up and runnning on port ${PORT}`));
