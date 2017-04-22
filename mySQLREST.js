
//I'm trying to create a REST service which deals with databases with restify and mysql.
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

// I hear that restify borrows alot from express.. like express for only REST..
/*server.use(function(req,res,next){ //allow to  serve cross domain requests
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
}) */
//allow cross origin so that android phones can access REST API..
server.opts(/.*/,function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Methods"));
  res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
  res.send(200); //response is OK
  return next()
})



//Empty db info on purpose
var pool = mysql.createPool({ //when using pools better vesrion.
  connectionLimit: 100, //100 users at atime
    host     : 'localhost',
    user     : 'root',
    password : 'Bob100',
    database : 'rest'
});

//work on encryptiion technique... use a function...
//testing for password encryption...
/*var password = "Hello this z goldsoft!!!!";
var salt = bcrypt.genSaltSync(5);//create a password salt.
// Salt and hash password
var passwordToSave = bcrypt.hashSync(password, salt)
console.log(passwordToSave);
*/
var salt = bcrypt.genSaltSync(10); //create password salt of 5... instead of 10

//to stop the server from crashing when it cant establish connectio to MYSQL.
/* pool.connect(function(err){
   //if err console.log(err); SyntaxError: Unexpected identifier... they mean err.
   if(err) console.log(err)

 })*/
//connection.connect(); ReferenceError: connection is not defined

server.get('/authenticate', function authenticate(req, res, next) {
    pool.getConnection(function(err, connection) {
        //connection.query('SELECT * FROM sometable WHERE id = 1', function(err, rows) {
            connection.query('SELECT * FROM task', function(err,rows){
            if (err) throw err;
            //release the connection when done with the SQL queries.
            connection.release();// i donot thik it z right place.. configure pliz.

             res.send(rows);
            //ensure that only JSON data is spitted out.
            //res.send(JSON.stringify(rows));//but not needed.. coz above code was doing work

            next();
        });
    });
});


//what about posting data...
server.post('/register', function(req,res,next){
  //capture teh posted values.
  var vehicleNo = req.params.vehicleNo,
       pass = req.params.password;
    //work on encrypting the password supplied....  later write it as function
    //var salt = bcrypt.genSaltSync(10); //create password salt of 5... instead of 10
    //salt n hash the password.
    var passwordToSave = bcrypt.hashSync(pass, salt); //started hashing password on vehicleNo... 8
        //what about the asynchronous nature... for many passwords..scalability.
      /*  bcrypt.hash(req.body.password, 5, function( err, bcryptedPassword) {

          var users={
             "email":req.body.email,
             "password":bcryptedPassword,
            "created":today,
         });*/
    //var carDetails = {vehicleNo: vehicleNo, vehiclePass: md5(pass)}
    var carDetails = {vehicleNo:vehicleNo, vehiclePass:passwordToSave};
      //console.log(carDetails)
      //make connection to the db.... to perform SQL insertion
    pool.getConnection(function(err,connection){
        connection.query('INSERT INTO vehicle SET ?', carDetails, function(err,rows){
          //connection.query('INSERT INTO vehicle SET ?', carDetails, function(err,count){
          //for inserting n updating better to get the count field ... rows count that has been affected
                 //? ==> escaping queries.. stop SQL injection.
          if (err) throw err;
          //relaese the connection.
          //res.send('Successfully inserted into the db');//
          //res.json('Successfully inserted into the db')
            //res.json({'User Added Successfully'});//SyntaxError: Unexpected token }
            res.json({"Message": "User Added Successfully"});

           next();
        })

  })
});

//for loggin.... the user
/*server.post('/login', function(req,res){
  // capture login creentials from login form
  var vehicleNoInput = req.params.vehicleNo,
       passInput = req.params.password;

  //make connection to the DB n compare the results to posted values.
  pool.getConnection(function(err,connection){
       //var sql = "SELECT * FROM vehicle WHERE vehicleNo = ? AND vehiclePass = ?"
       connection.query(sql ,[vehicleNo, pass], function(err,count){

           if (err) throw err;
           res.send(count);
       })*/
    //utilize the bcrypt login script instead of md5..
    /*   connection.query("SELECT * FROM vehicle WHERE vehicleNo = ?",
                          [vehicleNoInput],
                    function(err,rows){
                    /*  if (err) {
                          //return done(err);
                          res.json({"Message": "Error happened"});
                      }
                      //well the username exists.. thus compare the passwords in db n for that of input
                      if (bcrypt.hashSync(passInput,salt)=== rows[0].vehiclePass) {
                        // if (bcrypt.hashSync(passwordEnteredByUser, salt) === rows[0].password) {
                            res.json({"Message": "Success"});
                      }*/
                      /*  if(err)throw err;
                        bcrypt.hashSync(passInput,salt)=== rows[0].vehiclePass){
                            res.json({"Message": "Success"});
                        }
                    }
     );
  })
}) */

//Login script that z going to work out.... but that z too much code samples looking
server.post('/login', function(req,res,next){
  // capture login creentials from login form
      var vehicleNoInput = req.params.vehicleNo, //vehicleNo is not defined
       passInput = req.params.password;
      //make the interactions with the DB... compare above values with DB results...
      pool.getConnection(function(err,connection){
        //selects user details from the DB... n compare the results.
        //thanx to http://technoetics.in/tutorials/handling user registration n login
        connection.query('SELECT * FROM vehicle WHERE vehicleNo = ?', [vehicleNoInput],
                  function(err,results,fields){ //callback...of db results.
                        if (err) {
                            // console.log("error ocurred",error);
                            res.send({ //no SQL connection.. SQL problems.
                                "code": 400,
                                "failed":"error ocurred"
                            });
                        } else {
                           //// console.log('The solution is: ', results);
                           //if no err, then check whether the email/user exists
                           if (results.length>0) {
                                //then check password for allowing successful login.
                                    /* if ([0].vehiclePass== passInput) { //compare with password supplied
                                          res.send({
                                            "code": 200,
                                            "success": "login successful"
                                          })*/
                                    //what abbout decrypting the hashed password from the DB..
                                    //bcrypt.compare(password, results[0].password, function(err, doesMatch){
                                    bcrypt.compare(passInput, results[0].vehiclePass, function(err,doesMatch){
                                        if(doesMatch){
                                           res.send({
                                             "code": 200,
                                             "success": "login successful"
                                           });
                                      //  }

                                         } else {
                                          res.send({
                                             "code": 204,
                                            "success":"Email and password does not match"
                                          });

                                        }
                                    });

                            } else {
                              res.send({
                                "code":204,
                                "success":"Email does not exist"
                              })
                           }
                        }

             })
      })
})

//reserve the parking area... update teh parkig_status table
/*server.get('/reserve/:id', function(req,res,next){ //update teh parking status of _id parking area.
     res.send(req.params.id); //can u get the Id of the parking slot clicked.
})*/
server.post('/reserve/:id', function(req,res,next){
     //update the parking status of the _id of parking area clicked on...
     //capture teh id of the parking area... n later teh username of the user...who z booking.
     //var parkingId = req.params.id; //or teh android client should pass the id.. itself./ url... instead
     var parkingId = req.params.parkingId;
      var title = req.params.title;
      var status = req.params.status;
      pool.getConnection(function(err,connection){
           //hey perform the sql transaction...
           var sql = "UPDATE task SET  Title=?,Status=? WHERE id = ? ";//table values
          //connection.query(sql,[Task.Title, Task.Status, id],function(err,rows){
          connection.query(sql,[title, status,parkingId],function(err,rows){ //posted variables
                if(err) throw err;
                res.json(rows);
          });
      });

})


server.listen(3000, function(){
    console.log('PMS is running on port 3000');
    //console.log('%s listening at %s', server.name , server.url)
});
