
//trying another algorithm but stick to the first point.
/*var SerialPort = require('serialport');
//The readLine parser converts the data into string lines.
var Readline = SerialPort.parsers.Readline;
//var port = new SerialPort('/dev/tty-usbserial1'); mac-os-x
var port = new SerialPort('COM21');//for windows
// creating the parser and piping can be shortened to
var parser = port.pipe(new Readline());
parser.on('data', function(){
  console.log(data);
})*/

/*
var s = "Goldsoft is good";
console.log(s.charAt(0));
console.log(s.charAt(3));

  var x = "Iam,tired,of,hostel";
 //var x = "Iam tired of hostel";
  var h = x.split(","); //or u could use ,  A1,B1,C1,
//var  h = x.split("-");
 //console.log(h);
for (var i = 0; i < h.length; i++) {
	//h[i]
	//console.log(h[i]);
	console.log(h[i].charAt(0));
	console.log(h[i].charAt(1));
	//console.log(h[i].charAt(2));
}

*/
var mysql = require('mysql');
var SerialPort = require("serialport");
var sql; //global sql variable

//creating db pool.
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'Bob100',
	database: 'smartpak',
	connectionLimit: 500
})

//opening the serial port.
var port = new SerialPort("COM21",{ //specify the port...
  //in this case u will hv to switch off Arduino IDE so as to avoid conflict of port COM21 with this program
  baudRate:9600, //this z optional ... coz it z already catered for.
  //// look for return and newline at the end of each data packet:
  //parsers: serialport.parsers.readline('r\n') //ReferenceError: serialport is not defined
    //parsers: SerialPort.parsers.readline('r\n')
   //parser: SerialPort.parsers.readline("\n") // '\n' can be any character of your choice
});

//opening serial port.. .open() event callback..
port.on('open', function(){  //move all this code to SerialPort constructor. as callback
         console.log('Serial port z opened');
   /*port.write('This z goldsoft', function(err){
      if (err) {
        return console.log('Error on writing', err.message);
        //recall in Arduino sketch... Serial.write('hello goldsoft'); //gives u control.
      }
      console.log('Message has written successful');//check ur serial port.
   })*/

   //You can get updates of new data from the Serial Port as follows:
    port.on('data', function(data){ //should be placed in the open event callback

         
          //put it teh string on teh same line.... A1 B1 CO D1... u should do this on arduino C code. done
           var str = data.toString();
          //split teh string.... basing on s.split('-') or s.split('|') or s.split('n'). 
           //var x = str.split("_"); //split according to spaces 
           var x = str.split(",");


           //make connection to the database... find teh most efficient way to do this.
           pool.getConnection(function(err,connection){
                //make comparison ....... on the data received.

                //result z string array..  u could actually enclose this  from for()in function.... insertData(data){}
          for(var i = 0; i<x.length; i++){
              //thus start doing the comparison.
              //for the first slot A
              if (x[i].charAt(0) == 'A') { //A0 or A1
                 if (x[i].charAt(1) == '0') {
                    //console.log("please update slot A with  EMPTY ");
                    //insert into the database.
                     sql = "UPDATE parkingSlot SET slot_status=?,reservedTime=?  WHERE slot_id = ? ";// table values
                    connection.query(sql,[0, new Date(),1], function(err,results){
                        if (err) throw err;
                        //res.send({status: 200, success: "ok"});
                        console.log('successful updated slot A with EMPTY in db');
                    });
                 } else{
                    //console.log("update slot A with OCCUPIED");
                       sql = "UPDATE parkingSlot SET slot_status=?,reservedTime=?  WHERE slot_id = ? ";// table values
                    connection.query(sql,[2, new Date(),1], function(err,results){
                        if (err) throw err;
                        //res.send({status: 200, success: "ok"});
                         console.log('successful updated slot A with OCCUPIED in db');
                        //console.log(results);
                    });
                 }
              }
              // for second slot B
               if (x[i].charAt(0) == 'B') { //A0 or A1
                 if (x[i].charAt(1) == '0') {
                    //console.log("please upate slot B with  EMPTY ");
                    sql = "UPDATE parkingSlot SET slot_status=?,reservedTime=?  WHERE slot_id = ? ";// table values
                    connection.query(sql,[0, new Date(),2], function(err,results){
                        if (err) throw err;
                        //res.send({status: 200, success: "ok"});
                        console.log('successful updated slot B with EMPTY in db');
                    });

                 } else{
                    //console.log("update slot B with OCCUPIED");
                    sql = "UPDATE parkingSlot SET slot_status=?,reservedTime=?  WHERE slot_id = ? ";// table values
                    connection.query(sql,[2, new Date(),2], function(err,results){
                        if (err) throw err;
                        //res.send({status: 200, success: "ok"});
                        console.log('successful updated slot B with OCCUPIED in db');
                    });
                 }
              }
                
              //for third slot C
               if (x[i].charAt(0) == 'C') { //A0 or A1
                 if (x[i].charAt(1) == '0') {
                    //console.log("please upate slot C with  EMPTY ");
                    sql = "UPDATE parkingSlot SET slot_status=?,reservedTime=?  WHERE slot_id = ? ";// table values
                    connection.query(sql,[0, new Date(),3], function(err,results){
                        if (err) throw err;
                        //res.send({status: 200, success: "ok"});
                        console.log('successful updated slot C with OCCUPIED in db');
                    });
                 } else{
                    //console.log("update slot C with OCCUPIED");
                     //console.log("please upate slot C with  EMPTY ");
                    sql = "UPDATE parkingSlot SET slot_status=?,reservedTime=?  WHERE slot_id = ? ";// table values
                    connection.query(sql,[2, new Date(),3], function(err,results){
                        if (err) throw err;
                        //res.send({status: 200, success: "ok"});
                        console.log('successful updated slot C with OCCUPIED in db');
                    });
                 }
              }
               /*
              //for fourth slot D
               if (i.charAt(0) == 'D') { //A0 or A1
                 if (i.charAt(1) == '0') {
                    console.log("please upate slot D with  EMPTY ");
                 } else{
                    console.log("update slot D with OCCUPIED");
                 }
              } 
                */

          } 

           })
          
          //traverse teh characters ... foreach() or normal loop..  


     })


});