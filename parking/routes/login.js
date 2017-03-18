
//using the router level middleware... router.get()... seperate functionality.
var express = require('express');//Basically we're requiring our Express functionality,
var router = express.Router();

//for the login part..
router.get('/login', function(req,res,next){
     console.log('Iam loginning into the PMS');
     next()
});

router.get('/hello', function(req,res,next){
    console.log('Accessing the hello part!!!');
    next()
})

//export it as a module...
//A core part of Node is that basically all modules export an object
// which can easily be called elsewhere in the code.
module.exports = router;
