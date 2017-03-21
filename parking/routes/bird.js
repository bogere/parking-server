
//http://stackoverflow.com/questions/23923365/how-to-separate-routes-on-node-js-and-express-4 verified

var express = require('express');
var router = express.Router();

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next(); //means pass to teh next middleware.
});


// Define the home page route
router.get('/', function(req, res) {
  res.send('home page'); //why is it missing next.
});

// Define the about route
router.get('/about', function(req, res) {
  res.send('About us');
});

router.get('/login', function(req,res){
  res.send('iam loginning int teh system');
  console.log('Currently logged in');
});

router.post('/register', function(req,res){
     var user = req.body.username,
         pass = req.body.password;
    console.log('Username:', user);
    console.log('Password:', pass);
    res.send(user);
})

module.exports = router;
