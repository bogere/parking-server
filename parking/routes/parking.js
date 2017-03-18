

var express = require('express');
var router = express.Router();

////using the router level middleware... router.get()... seperate functionality.

router.get('/', function(req,res,next){
    console.log('Accessing the parking data');
    next()
});

router.get('/signup', function(req,res,next){ //if lacks req,res parameters.. the browser redirects continously
  console.log('Iam registering one of the drivers')
  next();
})

module.exports = router; // this makes all the routes(/ or /register) defined  available in object.
