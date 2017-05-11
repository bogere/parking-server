//I'm trying to create a REST service which deals with databases with restify and mysql.
var restify = require('restify');
var mysql = require('mysql');
var server = restify.createServer({
  name: 'KaziBoard',
  version: '1.0.0' //borrows alot from ExpressJS
});
//catering for the posted values.
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS()); //enable cross origin requests.
//Allow the CROSS ORIGIN requests.
server.opts(/.*/, function(req,res,next){
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Methods"));
   res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
   res.send(200); //response is OK
   return next()

})

var pool = mysql.createPool({ //when using pools better vesrion.
  connectionLimit: 200, //100 users at atime
    host     : 'localhost',
    user     : 'root',
    password : 'Bob100',
    database : 'webix'
});

//retrieving all teh tasks of the board. Loading teh tasks
server.get('/tasks', function(req,res,next){
  pool.getConnection(function(err, connection) {
        //connection.query('SELECT * FROM sometable WHERE id = 1', function(err, rows) {
        connection.query('SELECT * FROM task', function(err,rows){ //i changed the table to hello.
        //connection.query('SELECT * FROM hello', function(err,rows){ //modification
       //connection.query('SELECT * FROM todo', function(err,rows){ //modification
            if (err) throw err;
            //release the connection when done with the SQL queries.
            connection.release();// i donot thik it z right place.. configure pliz.

             res.send(rows);
            //ensure that only JSON data is spitted out.
            //res.send(JSON.stringify(rows));//but not needed.. coz above code was doing work

            next();
        });
    });
})

//for saving teh tasks... insert|update|delete
server.post('/task_save', function(req,res,next){

      //capturing teh posted values
      //var operation = req.body.webix_operation;
      var operation = req.params.webix_operation; //capture the type of operation from webix.
        //console.log(operation);
      //get teh id  of the posted values. capture teh post values.
         var id = req.params.id;
         var text = req.params.text,
            details= req.params.details,
            status = req.params.status,
            personId= req.params.personId;

    //perform the  database connection at onChange
     pool.getConnection(function(err,connection){
         //Adding teh  tasks
         if (operation== "insert") {

           //capture all teh values.
           var taskDetails = {text:text, details:details, status:status, personId:personId};
            //insert the takskDetails in the database.
            //connection.query('INSERT INTO hello SET ?', taskDetails, function(err,rows){
              connection.query('INSERT INTO task SET ?', taskDetails, function(err,rows){
                     if (err) throw err;
                       //res.json({"Message": "Task added successfully"});
                     // display the json response with teh response of data affected.
                       res.json({"id": "id", "status": "success"});//insert response.

                  next()
            });


           //for updating teh tasks... Editing
         } else if (operation == "update"){

             var sql = "UPDATE task SET text=?, details=?, status=?, personId=? WHERE task_id=?";
             connection.query(sql,[text, details, status,personId,id] , function(err,results){
                      // the [values].. values retrieved from the form.  utiilisng the personId for editing
                      if(err) throw err;
                     //res.json(rows);
                      //res.json(results)
                   //  res.json({"Message": "update of tasks was successful"});
                     res.json({"id": "id", "status": "success"}); //update response to notify the client.
             })

           //for deleting teh tasks... removing them.
         } else if (operation == "delete"){

               var sql = "DELETE FROM task WHERE task_id =?"; //let see the results.
               connection.query(sql, [id], function(err,rows){
                    if(err) throw err;
                    //res.json(rows);
                    //res.json({"Message": "Tasks was successfully deleted"});
                    res.json({"id": "id", "status": "success"});
               });


         } else {
             //Not supported operation
              res.json({"Message": "Operation not supported"});
         }
     });

});


//server must have alistening port for it to return
server.listen(3000, function(){
   console.log('Magic Kanaban at port 3000');
});
