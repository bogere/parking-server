/*
Application-level middleware
Bind application-level middleware to an instance of the app object by using the app.use() and app.METHOD() functions,
*/
var express = require('express'),
   app = express();

   //set the express parts.
   app.set('port', process.env.port ||3000);
//This example shows a middleware function with no mount path.
//The function is executed every time the app receives a request.
/*
app.use(req,res, next){ //SyntaxError: Unexpected token {

   console.log('Time:::', Date.now());
   next(); //passes control to the next middleware.
}
*/
app.use(function(req,res,next){
  console.log('Time:::', Date.now());
  next(); //passes control to the next middleware.
});

//Here is an example of loading a series of middleware functions at a mount point, with a mount path.
//kind of like  other sub tasks.
app.use('/user/:id', function(req,res,next){
    console.log('Request  URL:', req.originalUrl);
    next()
},function(req,res,next){ //middleware sub-task... prints  request info for any type of HTTP request to the /user/:id path.
   console.log('Request Type', req.method);
   next();
});

//Route handlers enable you to define multiple routes for a path. The example below defines two routes
// for GET requests to the /user/:id path.  The second route will not cause any problems,
// but it will never get called because the first route ends the request-response cycle.
  app.get('/user/:id', function(req,res,next){
     console.log('ID:', req.params.id);
     next()
  }, function(req,res,next){
       res.send('Helllo Iam using middleware sub- stack')
      //res.render('hello');
  })
  // handler for the /user/:id path, which prints the user ID
  app.get('/user/:id', function(req,res,next){
     res.end(req.params.id);
  })

//what about router level middleware..
 var router = express.Router();  //instantiate the express.Router().
//Load router-level middleware by using the router.use() and router.METHOD() functions.
 // a middleware function with no mount path. This code is executed for every request to the router
 router.use(function(req,res,next){
    console.log('Iam using the router level middlewARE')
    next()
 })

 // a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/wines/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

//mount the router for the app.
app.use('/', router);

//Use third-party middleware to add functionality to Express apps.
var cookieParser = require('cookie-parser');
// load the cookie-parsing middleware
app.use(cookieParser());
//for other list of most common middleware...https://expressjs.com/en/resources/middleware.html

//Error handling middleware..
app.use(function(err,req,res,next){
   console.error(err.stack);
   res.status(500).send('Something broke.');
   next()
});


/*app.listen(3000, function(){
  console.log('Learning Express on port 3000');
});*/
app.listen(app.get('port'), function(){
  console.log('Learning express on port', app.get('port'));
})
