
//////using the router level middleware... router.get()... seperate functionality.
var express = require('express');
var  mysql = require('mysql');
var router = express.Router();

//create connection to the localhost.
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Bob100',
    database: 'rest'
});
//what is difference with this...var connection=mysql.createPool({}) use pools for efficiency
connection.connect(function(err){
  if (err) { //ReferenceError: err is not defined... u forgot to include it in function() args..
     console.error('Error connecting', err.stack);
     return;
  }
  console.log('Successfully connected to the  db..')
}); //make connection.  export it as module..dbconnection.

router.get('/', function(req,res,next){
  res.send('Accessing the Parking home page');
    //console.log('Accessing the parking data'); //parking slot..
    //interact with the db... return the parking data.
    //var sql = "SELECT * FROM 'task'"; //Error: ER_PARSE_ERROR: You have an error in your SQL syntax;
    var sql = "SELECT * FROM task";
    connection.query(sql, function(err,rows){
       if (err) {
           //res.json(err); //Error: Can't set headers after they are sent.
          console.log(err);
       } else {
        //  res.json(rows); //what about JSON.Stringify()...
        console.log(rows)
       }
    })
    next()
});

router.get('/signup', function(req,res,next){ //if lacks req,res parameters.. the browser redirects continously
   res.send('Registering in progress');
  console.log('Iam registering one of the drivers')
  next();
})

module.exports = router; // this makes all the routes(/ or /register) defined  available in object.
