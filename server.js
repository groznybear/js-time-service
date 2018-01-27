// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/dreams", function (request, response) {
  // response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  // dreams.push(request.query.dream);
  response.sendStatus(200);
});

app.post("/time_input", function (request, response) {
  
  if(!request.query.dream)
    return;
  
  var unixStamp = parseInt(request.query.dream);
  var timestamp = Date.parse(request.query.dream);  
  
  var date;
  
  if(unixStamp)
  {
    date = new Date(unixStamp);
    console.log('unix :: ' + date);
  }
  else if (isNaN(timestamp) == false)
  {
      date = new Date(timestamp);
  }
  else
  {
    date = new Date(request.query.dream);
    console.log('natural :: ' + date);  
  }
  if(!isNaN(date))
  {
    response.send(date.toString()); 
  }
  else
  {
    response.send();
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
