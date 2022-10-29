'use strict';

const axios = require('axios');
let cache = require('./cache.js');

// TODO: need create a key - for data to store
// TODO: if the things exist AND is in a valid timeframe ...send that data
// TODO: if the the things DO NOT exist - call API & cache the returned data

async function movieMod(req, res, next){
  try {
    let cityName = req.query.searchQuery;

    // *** KEY CREATION FOR DATA TO STORE***
    let key = cityName + 'movie';

    // *** IF data exist AND is in a valid timeframe(cache[key].timestamp) ... send that data
    if(cache[key] && (Date.now() - cache[key].timestamp < 50000)){

      console.log('Cache was hit, movies are present');
      res.status(200).send(cache[key].data);

    } else{
      console.log('Cache missed -- no movies present');
      let movieUrl = `http://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}&language=en-US&page=16include_adult=false`;
      let movieData = await axios.get(movieUrl);

      let parsedData = movieData.data.results.map(movie => new Movie(movie));

      // ** ADD API return to CACHE
      cache[key] = {
        data: parsedData,
        timestamp: Date.now()
      };

      res.status(200).send(parsedData);

    }

  } catch (error) {
    next(error);
  }
}

class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.img = movieObj.poster_path;
  }
}

module.exports = movieMod;
