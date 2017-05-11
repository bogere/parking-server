//finsl piece of the backend.... of cousre like draft. only add code here after testing it.
var restify = require('restify');
var mysql = require('mysql');
//var md5 = require('md5');
var bcrypt = require('bcrypt');

var server = restify.createServer({
  name: 'Parking Mgt Server',
  version: '1.0.0' //borrows alot from ExpressJS
});
//catering for the posted values.
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS()); //enable CORS requests.


//allow cross origin so that android phones can access REST API..
server.opts(/.*/,function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Methods"));
  res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
  res.send(200); //response is OK
  return next()
})

//creating a db pool..
var pool = mysql.createPool({ //when using pools better vesrion.
  connectionLimit: 200, //100 users at atime
    host     : 'localhost',
    user     : 'root',
    password : 'Bob100',
    database : 'smartpak'
});


//generate the salt.
var salt = bcrypt.genSaltSync(10);


//Registering the drivers.
server.post('/register', function(req,res,next){
   //capture teh posted values from form... via android or... he must just post string values
   var username = req.params.username,
       pass = req.params.password;

    //encrypt the password submitted..hash it.
    var passToSave = bcrypt.hashSync(pass, salt); //hash password with salt... more secure

    var driverDetails = {username: username, password: passToSave};

    //perform the database intercations
    pool.getConnection(function(err,connection){
       //if (err) throw err;
       //var sql = "INSERT INTO vehicle SET ?" ;//? for ecaping values to combat SQL injection
       var sql = "INSERT INTO drivers SET ?"; //? for ecaping values to combat SQL injection
       connection.query(sql, driverDetails, function(err, results){
           if(err) throw err;
           res.json({"Message": "Driver registered  successful"});
           //for android... client res.json('success');
           next();
       })

    })

})


//Allow login.....authenication
server.post('/login', function(req,res,next){
     //capture the login credentials from the login page
     var username = req.params.username,
           passInput = req.params.password;

      pool.getConnection(function(err,connection){
          ////selects user details from the DB... n compare the results.
          ////thanx to http://technoetics.in/tutorials/handling user registration n login
          //var sql = "SELECT * FROM vehicle WHERE vehicleNo = ?";
          var sql = "SELECT * FROM drivers WHERE username = ?";
          connection.query(sql, [username], function(err,results){
               if err throw err; // error in making db queries.
               //retrieve teh driver details n compare.
               if (results.length>0) {
                   //if user exists... in the db.
                    bcrypt.compare(passInput, results[0].password, function(err,doesMatch){
                        if (doesMatch) {
                            //res.json()
                            res.send({"status":200, "sucess": "login successful"})
                        } else {
                            res.send({"status": 204, "success": "Username n password do not match"})
                        }
                    })

               } else {
                  //user does not exist.
                  res.json({"Message": "User does not exist"});
               }
          })
      });

});


//retrieving the parking details.
server.get('/parking', function(req,res,next){
     pool.getConnection(function(err,connection){

         //connection.query('SELECT * FROM task', function(err, results){
         var sql = "SELECT * FROM parkingSlot"; //betetr SELECT only  slot_id , slot_name n slot_status
         connection.query(sql, function(err, results){
            if(err) throw err;
            res.send(results);
            connection.release();
            next();
         })
     })
});


//reserveing the parking space.
server.post('/reserve/:id', function(req,res,next){
  //update the parking status of the _id of parking area clicked on...
  //capture teh id of the parking area... n later teh username of the user...who z booking.
  //var parkingId = req.params.id; //or teh android client should pass the id.. itself./ url... instead
      var parkingId = req.params.parkingId,
           parkingStatus = req.params.parkingStatus,
          username =  req.params.username;

      pool.getConnection(function(err,connection){
          //var sql = "UPDATE task SET  Title=?,Status=? WHERE id = ? ";//table values
          var sql = "UPDATE parkingSlot SET slot_status=?,reserveTime=?, slot_occupant WHERE slot_id = ? "; //tabel values
          //connection.query(sql, [title, status,parkingId], function(err,results){
        connection.query(sql, [parkingStatus,new Date(),username, parkingId], function(err,results){//post values from form
             if(err) throw err;
             res.send(results);
          })
      })


});

//calculating teh parking bill..
server.post('/parkingBill:/id', function(req,res,next){
    var parkingId = req.params.parkingId,
       //mak these values global to small extent with this callback.
          var startPark, endPark, parkingDuration,parkingBill; //serious memory leaking.
     //where teh computation problem lies.
     //var sql = "SELECT  StartTime , EndTime FROM parking WHERE id =?" ;
     var sql = "SELECT startTime AND endTime FROM parkingSlot WHERE slot_id = ?";
    connection.query(sql,[parkingId], function(err, results){
           if(err) throw err;
           //captures the results data n start making computation.
           if (results.length>0) { //parking details r around.
               //results[0].EndTime =
              // var startPark = results[0].startTime,//better make them global variables to access them.
                   startPark = results[0].startTime;
                   endPark = results[0].endTime; //for the computation.

           } else {
               res.send({"status": "401", "success": "No parking info"});
           }
    });

    //then u can perform ur computation here..
    /*  parkingDuration = endPark - startPark;
      parkingBill = parkingDuration * 1500 ; //1500/= per hour.*/
      parkingBill = (endPark- startPark)* 1500;  //make teh pricing dynamic..
      console.log(parkingBill);


})



server.listen(3000, function(){
    console.log('PMS is running on port 3000');
    //console.log('%s listening at %s', server.name , server.url)
});
