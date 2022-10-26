'use strict';

console.log('Yoo, My first server!');

// const {response, request} = require('express');
// ****** REQUIRES *******
const express = require('express');
require('dotenv').config();
let weatherData = require('./data/weather.json');
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
// console.log('This is showing up in my terminal!');
// response.status(200).send('Welcome to my server');

app.get('/weather', (request, response, next) => {
  try {
    let city = request.query;
    let lat = request.query.lat;
    let lon = request.query.lon;

    let cityNameData = weatherData.find(cityObj => cityObj.city_name.toLowerCase() === city.toLowerCase() && Math.floor(cityObj.lat) === lat && Math.floor(cityObj.lon) === lon);

    let dataSend = cityNameData.data.map(details => new Forecast(details));
    response.status(200).send(dataSend);

  } catch (error) {
    next(error);
  }
});



class Forecast {
  constructor(city) {
    this.city_name = city.description;
    this.datetime = city.datetime;
  }
}

// catch all and should live at the bottom
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

// ****** ERROR HANDLING ********




// ******* SERVER START ********
app.listen(PORT, () => console.log(`We are up and runnning on port ${PORT}`));
