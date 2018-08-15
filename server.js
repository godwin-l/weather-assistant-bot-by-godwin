'use strict';
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const apiKey = '9ae40b8fdec0b4d7bc95aa14b4393ce3';
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Server listening on port %d in %s mode', server.address().port, app.settings.env);
});

const io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log('Godwin connected to speak with his weather assistant');
});
io.on('connection', function(socket) {
  socket.on('city name', (text) => {
	  let city = text ;
	  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9ae40b8fdec0b4d7bc95aa14b4393ce3`;

  request(url, function (err, response, body) {
    if(err){
      //  res.render('index', {weather: null, error: 'Error, please try again'});
	  console.log(weather);
	  socket.emit('reply', weather);
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
       //  res.render('index', {weather: null, error: 'Error, please try again'});
	   console.log(weather);
	   socket.emit('reply', weather);
      } else {
        let weatherText = 
	   `It's ${weather.main.temp} degree Celsius in ${weather.name}.Pressure in ${weather.name} is ${weather.main.pressure} hPa and the Humidity is ${weather.main.humidity} %.
		The Minimum Temperature of ${weather.name} is ${weather.main.temp_min} degree Celsius and the Maximum Temperature is ${weather.main.temp_max} degree Celsius.
		Sea Level of ${weather.name} is  ${weather.main.sea_level} hPa and the Ground Level of ${weather.name} is ${weather.main.grnd_level} hPa.
		The Speed of the wind is ${weather.wind.speed} meter/sec and the wind direction is ${weather.wind.deg} degrees.
		The geographic location of the ${weather.name} is ${weather.coord.lon} degree Latitude and ${weather.coord.lat} degree Longnitude.
		${weather.name} is located in the Country ${weather.sys.country}.
		The cloudliness percentage is ${weather.clouds.all} %.
		The Sun rises at ${weather.sys.sunrise} UTC and sets at ${weather.sys.sunset} UTC.`;
        //   res.render('index', {weather: weatherText, error: null});
		weather=weatherText;
		console.log(weather);
		socket.emit('reply', weather);
      }
    }
  });
 });
});
app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
});