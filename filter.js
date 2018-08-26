// Developer : Godwin

var express = require('express');
const bodyParser = require("body-parser");
var app = express();
const MongoClient = require('mongodb').MongoClient;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
MongoClient.connect('mongodb://alloygodwin:mobileking1@ds147440.mlab.com:47440/godwin', { useNewUrlParser: true }, function (err, client) {
  if (err) throw err;
  var db = client.db('godwin');
  app.get('/', function(req,res) {
	 var min=15;
	 var max=20;
	  
    db.collection('crops').find({ $or: [ { mintemp: { $gte: min, $lte: max } }, { maxtemp: { $gte: min, $lte: max } } ] }).toArray(function(err, result) {
    if(err) throw err;
	var data = result;
	console.log(data);

  });
 });
});
app.listen(7000);
console.log("Listening in Port 7000");