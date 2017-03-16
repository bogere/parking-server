/*
Application-level middleware
Bind application-level middleware to an instance of the app object by using the app.use() and app.METHOD() functions,
*/
var express = require('express'),
   app = express();
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
  })


app.listen(3000, function(){
  console.log('Learning Express on port 3000');
});
