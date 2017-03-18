
//Building the parking Mgt server....
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var errorHandler = require('errorhandler');//Error: Cannot find module 'errorhandler'

//load the routes... divide ur server business logic.. authenicate n register
//var auth = require('./routes/authenicate');
var parkingSlots = require('./routes/parking'); */
var Login = require('./routes/login');
//var multer = require('multer'); //deals with file uploads.. like images
var app = express(); //create express object.

//set up the environment.. utilise the 3rd party middleware.
app.set('port', process.env.port || 3000);
app.use(logger('dev')); //get logs during development..
//Parse incoming request bodies in a middleware before your handlers, availabe
//under the `req.body` property.
app.use(bodyParser.json({limit: '100mb'})); //Returns middleware that only parses `json`.
app.use(bodyParser.urlencoded({limit:'100mb', extended: false})); //increase in case of problem
//app.use(multer()); //middleware to handle file uploads.
//app.use(express.static(path.join(__dirname , 'public' ))); //serving static files...html n css in public folder.
//allow CORS... origin stuff.
app.use(function(req, res,next){ //for ecah request despite the route.
    res.header('Access-Control-Allow-Origin', '*'); //all routes.
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next()
})

app.get('/', function(req,res, next){
    res.send('Iam acessing the PMS')
    next()
})
//utilising the routes.... mount routes to the app object..
//app.use('/api', router); code4Geek.
//app.use('/', router);  //ReferenceError: router is not defined
//app.use('/login', login);
//app.use('/login', Login);
app.use('/', Login);

//// error handling middleware should be loaded after the loading the routes
/*if (development = app.get('env')) { //devt environment.
   app.use(errorHandler()); //use ur custom code pliz.
}*/

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
