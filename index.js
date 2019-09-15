var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const  {set, get, del, dbsize,incr,zAdd,zCard,zRank,zRange }  = require('./services/redis');

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.post('/get', function (req, res) {
    get(req.body.key)
    .then((value)=>{ 
      console.log(value)
      res.send(""+value)
    } );
  
});

app.post('/set', function (req, res) {
  set(req.body.key,req.body.value)
  .then((value)=>res.send(value));

});

app.post('/del', function (req, res) {
  del(req.body.key)
  .then((value)=>res.send(value));

});
app.post('/incr', function (req, res) {
  incr(req.body.key)
  .then((value)=>  res.send(""+value));

});
app.post('/zadd', function (req, res) {
  zAdd(req.body.key,req.body.score,req.body.value)
  .then((value)=>  res.send(""+value));

});
app.post('/zcard', function (req, res) {
  zCard(req.body.key)
  .then((value)=>  res.send(""+value));

});
app.post('/zcard', function (req, res) {
  zCard(req.body.key)
  .then((value)=>  res.send(""+value));

});
app.post('/zrank', function (req, res) {
  zRank(req.body.key,req.body.value)
  .then((value)=>  res.send(""+value));

});
app.post('/zrange', function (req, res) {
  zRange(req.body.key,req.body.start,req.body.stop)
  .then((value)=>  {
    console.log(valueg)
    res.send(""+value)
    }
    );

});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});