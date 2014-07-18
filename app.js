var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

// set the app to parse the JSON webhooks
app.use(bodyParser.json());

// set endpoint urls via environmnet variables
var secret_url = process.env.SECRET_URL || '/realtime/';
var endpoints = process.env.ENDPOINTS  || ['http://127.0.0.1:1337/'];
// this should be a list

console.log('webhook router created at '+
  secret_url+' with endpoints '+endpoints);

// simple logger
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

// displays current url enpoints
app.get(secret_url,function(req,res,next){
  res.send(200, 'Endpoints currently are: '+ endpoints);
});

app.post(secret_url, function(req,res,next){
  console.log(req.body);
  for (var i =0; i < endpoints.length; i++) {
    request({
      url: endpoints[i],
      method: 'POST',
      json: req.body
    }, function(error, response, body) {
      if (error) {
        console.log(error);
      }
    });
    console.log('WEBHOOK SENT TO: '+endpoints[i]);
  }
  res.send(200, 'REQUEST RECIEVED');
});

// main page to check if app is running
app.get('/', function(req, res, next){
  res.send(200, 'The server is functioning normally');
});

app.listen(8000);
