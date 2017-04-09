
//I'm trying to create a REST service which deals with databases with restify and mysql.
var restify = require('restify');
var mysql = require('mysql');
var md5 = require('md5');

var server = restify.createServer({
  name: 'Parking Mgt Server',
  version: '1.0.0' //borrows alot from ExpressJS
});
//catering for the posted values.
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());


//Empty db info on purpose
var pool = mysql.createPool({ //when using pools better vesrion.
  connectionLimit: 100, //100 users at atime
    host     : 'localhost',
    user     : 'root',
    password : 'Bob100',
    database : 'rest'
});

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
    var carDetails = {vehicleNo: vehicleNo, vehiclePass: md5(pass)}
      console.log(carDetails)
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
server.post('/login', function(req,res){
  // capture login creentials from login form
  var vehicleNo = req.params.vehicleNo,
       pass = req.params.password;

  //make connection to the DB n compare the results to posted values.
  pool.getConnection(function(err,connection){
       //var sql = "SELECT * FROM vehicle WHERE vehicleNo = ? AND vehiclePass = ?"
       var sql = "SELECT * FROM vehicle WHERE vehicleNo = ? AND md5(vehiclePass)= ?"
       connection.query(sql ,[vehicleNo, pass], function(err,count){
          /* if (err) {
              res.json(err);
           } else {
               res.json(count)
           }*/
           if (err) throw err;
           res.send(count);
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
