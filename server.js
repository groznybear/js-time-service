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

app.post("/time_input", function (request, response) {
  
  if(!request.query.date)
    return;
  
  var unixStamp = parseInt(request.query.date);
  var timestamp = Date.parse(request.query.date);  
  
  var date;
  
  if (isNaN(unixStamp) == false)
  {
      date = new Date(unixStamp * 1000);
  }
  else if (isNaN(timestamp) == false)
  {
      date = new Date(timestamp);
      unixStamp = date.getTime()/1000;   
  }  
  
  var locale = "en-us";
  
  var obj = {
      unix: isNaN(date) ? null : unixStamp,
      natural: isNaN(date) ? null : date.toLocaleString(locale, {month: "long"}) + ' ' + date.getDate().toString() + ', ' + date.getFullYear(),
    };
  response.send(JSON.stringify(obj));
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
