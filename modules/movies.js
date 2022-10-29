'use strict';
const axios = require('axios');

async function moviesMod(req, res, next){
  try {
    let cityName = req.query.city_name;

    let movieUrl = `http://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}&language=en-US&page=5include_adult=false`;
    console.log('getting movie data', movieUrl);

    let movieData = await axios.get(movieUrl);

    let dataToSend = movieData.data.results.map(movie => new Movie(movie));
    res.status(200).send(dataToSend);

  } catch (error) {
    console.log(error);
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

module.exports= moviesMod;
