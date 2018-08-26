require('dotenv').config()
const express = require('express');
let ejs = require('ejs');
const bodyParser = require('body-parser');
const request = require('request');
var url = require('url');
const app = express();
const apiKey = '9ae40b8fdec0b4d7bc95aa14b4393ce3';
const MongoClient = require('mongodb').MongoClient;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');



const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Server listening on port %d ', server.address().port);
});

const io = require('socket.io')(server);
io.on('connect', function(socket){
  //console.log('Godwin connected to speak with his weather assistant');
});

   
io.on('connect', function(socket) {
  socket.on('city name', (text) => {
	  let city = text ;
	  let linkdata = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9ae40b8fdec0b4d7bc95aa14b4393ce3`;

  request(linkdata, function (err, response, body) {
    if(err){
	  socket.emit('assistantreply', weather);
    } else {
      let weather = JSON.parse(body);
      if(weather.main == undefined){
	   socket.emit('assistantreply', weather);
      } else {
     
		let lat =  weather.coord.lat;
		let lon =  weather.coord.lon;
	
	    var tempmin=weather.main.temp_min;
	    var tempmax=weather.main.temp_max;
	
	let soil =	'http://api.agromonitoring.com/agro/1.0/soil?lat=' + lat + '&lon=' + lon + '&appid=9ae40b8fdec0b4d7bc95aa14b4393ce3';
	
		
	request(soil, function (err, response, body) {
    if(err){
        console.log(err);
    } else {
      let soildata = JSON.parse(body)
      if(soildata == undefined){
	   console.log("undefined");
      } else {
     let soilDetails =`Time of data is ${soildata.dt} , Temperature on the 10 centimeters depth is ${soildata.t10}  , Moisture is ${soildata.moisture} , Surface temperature is ${soildata.t0}`;
	  var soilcontent =soilDetails;
	  socket.emit('soilreply', soilcontent);
      }
    }
  });
	
        let weatherDetails = 
	   `It's ${weather.main.temp} degree Celsius in ${weather.name}.Pressure in ${weather.name} is ${weather.main.pressure} hPa and the Humidity is ${weather.main.humidity} %.
		The Minimum Temperature of ${weather.name} is ${weather.main.temp_min} degree Celsius and the Maximum Temperature is ${weather.main.temp_max} degree Celsius.
		Sea Level of ${weather.name} is  ${weather.main.sea_level} hPa and the Ground Level of ${weather.name} is ${weather.main.grnd_level} hPa.
		The Speed of the wind is ${weather.wind.speed} meter/sec and the wind direction is ${weather.wind.deg} degrees.
		The geographic location of the ${weather.name} is ${weather.coord.lat} degree Latitude and ${weather.coord.lon} degree Longnitude.
		${weather.name} is located in the Country ${weather.sys.country}.
		The cloudliness percentage is ${weather.clouds.all} %.
		The Sun rises at ${weather.sys.sunrise} UTC and sets at ${weather.sys.sunset} UTC.`;
		weather=weatherDetails;
		socket.emit('assistantreply', weather);
      }
    }
  });
 });
});

MongoClient.connect('mongodb://alloygodwin:mobileking1@ds147440.mlab.com:47440/godwin', { useNewUrlParser: true }, function (err, client) {
	if (err) throw err;
  var db = client.db('godwin');
app.get('/', function (req, res) {
	
	
	 //var min=weather.main.temp_min;
	 //var max=weather.main.temp_max;
	 var min =15;
	 var max =20;
	 //console.log(min);
	// console.log(max);
	
     
     db.collection('crops').find({ $or: [ { mintemp: { $gte: min, $lte: max } }, { maxtemp: { $gte: min, $lte: max } } ] }).toArray(function(err, result) {
     if(err) throw err;
	 var data = result;
	 var cropname = [];
	 datalen = data.length;
	 for(var i=0;i<datalen;i++)
	 {
		var name = data[i].name;
        cropname.push(name);
	 }
	 for(var j=0;j<datalen;j++)
	 {
	  var message = cropname[j];
	 
	 }
	 var alldata = cropname.join(',');
	console.log("The crops that can be planted based on temperature are " + alldata );
	res.render('index', { alldata: alldata });
	});
	
	
	var minrain = 80;
	var maxrain = 100;
	
	db.collection('crops').find({ $or: [ { minrainfall: { $gte: minrain, $lte: maxrain } }, { maxrainfall: { $gte: minrain, $lte: maxrain } } ] }).toArray(function(err, result) {
     if(err) throw err;
	 var data = result;
	 var rainfall = [];
	 rainlen = data.length;
	 for(var i=0;i<rainlen;i++)
	 {
		var name = data[i].name;
        rainfall.push(name);
	 }
	 for(var j=0;j<rainlen;j++)
	 {
	  var message = rainfall[j];
	 
	 }
	 var allrain = rainfall.join(',');
	console.log("The crops that can be planted based on rainfall are " + allrain );
//	res.render('index', { allrain: allrain });
	});
	
	
	var minval = 5.0;
	var maxval = 5.5;
	
	db.collection('acidity').find({ $or: [ { minvalue: { $gte: minval, $lte: maxval } }, { maxvalue: { $gte: minval, $lte: maxval } } ] }).toArray(function(err, result) {
     if(err) throw err;
	 var data = result;
	 var acid = [];
	 var datalen = data.length;
	 for(i=0;i<datalen;i++)
	 {
		var acidity = data[i].name;
		 acid.push(acidity);
	 }
	 var allacid = acid.join(',');
	
	console.log("The crops that can be planted based on acidity are " + allacid);
	
 //	res.render('index', { allacid: allacid  });
	});
	
	
	var minmois = 60;
	var maxmois = 70;
	
	db.collection('moisure').find({ $or: [ { minpercent: { $gte: minmois, $lte: maxmois } }, { maxpercent: { $gte: minmois, $lte: maxmois } } ] }).toArray(function(err, result) {
     if(err) throw err;
	 var data = result;
	 var moisture = [];
	 var moislen = data.length;
	 for(i=0;i<moislen;i++)
	 {
		var mois = data[i].name;
		 moisture.push(mois);
	 }
	 var allmoisture = moisture.join(',');
	
	console.log("The crops that can be planted based on moisture are " + allmoisture);
	
 //	res.render('index', { allmoisture: allmoisture  });
	});
	
	
	
	var minraindesc = 401;
	var maxraindesc = 600;
	
	db.collection('rainfall').find({ $or: [ { minrainfall: { $gte: minraindesc, $lte: maxraindesc } }, { maxrainfull: { $gte: minraindesc, $lte: maxraindesc } } ] }).toArray(function(err, result) {
     if(err) throw err;
	 var data = result;
	 var descript = data[0].description;
	
	console.log("Vegetation : " + descript);
	
 //	res.render('index', { descript: descript  });
	});

});
});