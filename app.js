var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

// set the app to parse the JSON webhooks
app.use(bodyParser.json());

// set default port to 8000
var port = process.env.PORT || 8000;

// keep the url of the splitter secret for security
var secret_url = process.env.SECRET_URL || '/realtime/';

// get all the url endpoints from the environment
// add any endpoint as an environmnet variable of the form TARGET_*
var endpoints = [];
var regex = /(?:TARGET_)/i;
for (var key in process.env) {
  match = regex.exec(key);
  if (match) {
    console.log('FOUND ENDPOINT '+process.env[key]);
    endpoints.push(process.env[key]);
  }
}

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

// a post request to the secret URL is sent to each endpoint
app.post(secret_url, function(req,res,next){
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

// main page to check if app is running; does not revel secret url
app.get('/', function(req, res, next){
  res.send(200, 'The server is functioning normally');
});

app.listen(port, '0.0.0.0');

console.log('server now running');
