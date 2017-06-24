
var mysql = require('mysql');
var SerialPort = require("serialport");
//console.log('hello iam connecting to serial port')


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
});

//initilise some global variables.

//opening serial port.. .open() event callback..
port.on('open', function(){  //move all this code to SerialPort constructor. as callback
         //console.log('Serial port z opened');
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
                        console.log('successful updated slot C with EMPTY in db');
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
     })


});

//kati this will be like ur database function
/*function showMe(data){
	console.log(data.toString());
}*/

//controlling the timing to insert the data.. u cant insert data into the db all times
//setTimeout(showMe,1000);//wait 1s for everything to initialize correctly
//setInterval(showMe,5000);////write data every 5s or increase it to 10 seconds.. perform this action again after 5 seconds

 
// open errors will be emitted as an error event
port.on('error', function(err){
   console.log('Error connecting to port. :', err.messsage); //error connecting to Arduino port
});

//show when the port z closed. remove usb cable.
port.on('close', function(){
	console.log("Arduino port z closed");
})