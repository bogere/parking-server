
//////using the router level middleware... router.get()... seperate functionality.
var express = require('express');
var  mysql = require('mysql');
var md5 = require('md5'); //hasing messages.
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
  //console.log('Successfully connected to the  db..'); //or use the else.. block to stop teh app from crashing
   console.log('Connected as id', connection.threadId);
}); //make connection.  export it as module..dbconnection.

router.get('/', function(req,res,next){
    res.send('Accessing the Parking home page');
  //setting the header in JSOn format.
     //res.setHeader('Content-Type', 'application/*+json'); //Error: Can't set headers after they are sent.
    //interact with the db... return the parking data.
    //var sql = "SELECT * FROM 'task'"; //Error: ER_PARSE_ERROR: You have an error in your SQL syntax;
    var sql = "SELECT * FROM task";
    connection.query(sql, function(err,rows){
       if (err) {
           //res.json(err); //Error: Can't set headers after they are sent.
          console.log(err);
       } else {
        //  res.json(rows); //what about JSON.Stringify()...
          console.log(JSON.stringify(rows));  //converts them into JSON perfectly.
         //res.end(JSON.stringify(rows)); //no data retrieved.
          //res.send(JSON.stringify(rows));
       }
    });
    connection.end(); //Closing the connection ...ensures all remaining queries r
                    //executed  b4 sending quit packet to  SQL server. terminate  connection gracefully

    next()
});

router.get('/signup', function(req,res,next){ //if lacks req,res parameters.. the browser redirects continously
   res.send('Registering in progress');
  console.log('Iam registering one of the drivers')
  next();
});

//for registering..
router.post('/register', function(req,res,next){
     //capture the values posted... VehicleNo n PIN or password. from the form.
         var vehicleNo =   req.body.vehicleNo,
                //  pass =   req.body.password;
                //pass = md5(req.body.password); //hash the password...not efficient..
                pass = req.body.password;

        //insert the values into the database..... register the user/car. neatly escaping queries... SQL injection.
          var carDetails = {vehicleNo: vehicleNo, vehiclePass: pass}; //caters for table columsn n its values.
         //var carDetails = {vehicle: vehicleNo, vehiclePass: md5(pass)};

         connection.query('INSERT INTO vehicle SET ?', carDetails,  function(err,rows){
                            //? ==> escaping queries.. stop SQL injection.
                if (err) {
                    console.log(err);
                } else {
                    console.log('Successfully registered', JSON.stringify(rows)); //difference btn rows n results.
                }

         });


 next()
})

module.exports = router; // this makes all the routes(/ or /register) defined  available in object.
