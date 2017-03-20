
//Building the parking Mgt server....

//Loading dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
//var errorHandler = require('errorhandler');//Error: Cannot find module 'errorhandler'

//load the routes... divide ur server business logic.. authenicate n register
//Then, load the router module in the app:
//var auth = require('./routes/authenicate');
//var parkingSlots = require('./routes/parking');
var parkingSlots = require('./routes/parking')(router);
var Login = require('./routes/login');//change it to auth later.
//var multer = require('multer'); //deals with file uploads.. like images
var app = express(); //create express object.

//set up the environment.. utilise the 3rd party middleware.
//app configuration
app.set('port', process.env.port || 3000);
app.use(logger('dev')); //get logs during development..
//Parse incoming request bodies in a middleware before your handlers, availabe
//under the `req.body` property.
app.use(bodyParser.json({limit: '100mb'})); //Returns middleware that only parses `json`.
//app.use(bodyParser.urlencoded({limit:'100mb', extended: false})); //increase in case of problem
app.use(bodyParser.urlencoded({extended: true}));
//app.use(multer()); //middleware to handle file uploads.
//app.use(express.static(path.join(__dirname , 'public' ))); //serving static files...html n css in public folder.
//allow CORS... origin stuff.
app.use(function(req, res,next){ //for ecah request despite the route.
    res.header('Access-Control-Allow-Origin', '*'); //all routes.
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next()
})

//route setting
/*
app.get('/', function(req,res, next){
    res.send('Iam acessing the PMS')
    next()
})  */

//utilising the routes.... mount routes to the app object..
//app.use('/api', router); code4Geek.
//app.use('/', router);  //ReferenceError: router is not defined
//app.use('/login', login);
//app.use('/login', Login);
//app.use('/', parkingSlots); //instead of this... / homepage
app.use('/parking', parkingSlots); //about the parking part. Acess sign upp like parking/signups wat abt /api/signup
//app.use('/login', Login);

//// error handling middleware should be loaded after the loading the routes
//Error handling
/*if (development = app.get('env')) { //devt environment.
   app.use(errorHandler()); //use ur custom code pliz.
}*/

///// catch 404 and forwarding to error handler
/*app.use(function(req,res,next){
  var err =new Error('Page or API is Not Found!!!');
  err.status = 404;
  next(err);
})*/

//once u get the template view.. view engine like jade..
/*
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
*/

//start the server.. pliz..
app.listen(app.get('port'), function(){
  console.log('Parking Mgt Server is running on port ', app.get('port'));
})
