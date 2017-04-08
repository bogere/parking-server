
//For parking Mgt Server..
//load the dependencies.
var express = require('express');
var rest = require('restify');
//var path = require('path'); u r not utilising static file http..not serving html files.
var cookieParser = require('cookie-parser'); //for cookies based.
var bodyParser = require('body-parser'); //for the post values...
var logger = require('morgan');
var cors=require('cors');
var  app = express(); //create the express() object.
//require the parts of code(modules) from other files.


//setting up the express middleware.
app.use('logger', dev); //for logging purposes... what is the problem
app.use(cors()); //allow the cross origin part.
app.use(cookieParser()); //what about secrets... as in express-sessions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use('/', function(req,res){
    //res.end()
    res.send('helloworld');
});

app.listen(3000, function(){
  console.log('Praking Mgt Server on port 3000');
})
