var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//try accessing the post values. via form.
router.post('/', function(req,res,next){
     var user = req.body.username,
      pass = req.body.password;
      console.log('Username:', user );
      console.log('Password:', pass);
})

module.exports = router;
