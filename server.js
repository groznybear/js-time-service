// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.all('/api/*', (req, res, next) => {
  console.log(JSON.stringify(req.headers));
  next();
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/api/current_time", (req, res) => {
  
  var timeZone = parseFloat(req.headers.timezone);
  var time = new Date().getTime();
  if(!isNaN(timeZone))
  {
    console.log(timeZone);
    var date = new Date();
    var localTime = date.getTime();
    var localOffset = date.getTimezoneOffset() * 60000;  
    time = localTime + localOffset + (3600000 * timeZone);    
  }  
  
  var currentTime = {
    unix: Math.floor(time / 1000),
    date: new Date(time).toString(),
  };
  res.end(JSON.stringify(currentTime));
});

app.get('/api/whoami', (req, res) => {
  res.end(JSON.stringify(whoami(req.headers)));
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
      unixStamp = Math.floor(date.getTime()/1000);   
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

var whoami = (headers) => 
{  
  var agent = headers["user-agent"];
  var fromIndex = agent.indexOf('(');
  var toIndex = agent.indexOf(')');
  
  var me = {
    ipaddress: headers["x-forwarded-for"].split(',')[0],
    language: headers["accept-language"].split(';')[0].split(',')[0],
    software: agent.substring(fromIndex + 1, toIndex),
  }
  
  return me;
};
