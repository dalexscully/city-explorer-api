'use strict';

require('dotenv');
const express = require('express');

const weather = require('./modules/weather.js');
const movie = require('./modules/movies.js');

const app = express();

app.get('/weather', weatherHandler);
app.get('/movies', movie);

function weatherHandler(req, res) {
  const { lat, lon } = req.query;
  weather(lat, lon)
    .then(summaries => res.send(summaries))
    .catch((error) => {
      console.error(error);
      res.status(200).send('Sorry. Something went wrong!');
    });
}

app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));
