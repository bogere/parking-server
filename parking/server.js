
//this testing on using multiple route files
//shttp://stackoverflow.com/questions/23923365/how-to-separate-routes-on-node-js-and-express-4
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

//Routes
//app.use(require('./routes'));  //http://127.0.0.1:8000/    http://127.0.0.1:8000/about
app.use(require('./routes/bird'));  //http://127.0.0.1:8000/    http://127.0.0.1:8000/about

//app.use("/user",require('./routes'));  //http://127.0.0.1:8000/user  http://127.0.0.1:8000/user/about


var server = app.listen(8000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
