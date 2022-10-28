'use strict';
const axios = require('axios');

async function weatherMod(req, res, next) {

  let lat = req.query.lat;
  let lon = req.query.lon;

  try {

    let weatherUrl = `http://api.weatherbit.io/v2.0/current?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=16`;

    console.log('getting weather data', weatherUrl);
    console.log(axios);
    let weatherData = await axios.get(weatherUrl);

    let parsedData = weatherData.data.data.map(day => new Forecast(day));
    console.log('got the weather', parsedData.length);

    res.status(200).send(parsedData);
  } catch (error) {
    next(error);

    res.status(500).send(error.message);
  }
}

class Forecast {
  constructor(ForecastData) {
    this.data = ForecastData.datetime;
    this.description = ForecastData.weather.description;
  }
}

module.exports = weatherMod;
