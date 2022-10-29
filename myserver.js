'use strict';

console.log('Yoo, My first server!');

// const {response, request} = require('express');
// ****** REQUIRES *******
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const weatherMod = require('./modules/myweather.js');
const movieMod = require('./modules/movies.js');

// once express is in we need to use it - per express docs
// app === server
const app = express();

// const cors = require('cors');
app.use(cors());


// define my port
const PORT = process.env.PORT || 3002;
// 3002 - if my server is up on 3002, then i know there something wrong with my .env file or i don't bring in dotenv library


// ****** BASE END POINTS ********

app.get('/', (req, res) => {
  console.log('This is showing up in my terminal!');
  res.status(200).send('Welcome to my server');
});

app.get('/weather', weatherMod);

app.get('/movies', movieMod);


// catch all and should live at the bottom
app.get('*', (req, res) => {
  res.status(404).send('This route does not exist');
});

// ****** ERROR HANDLING ********




// ******* SERVER START ********
app.listen(PORT, () => console.log(`We are up and runnning on port ${PORT}`));
