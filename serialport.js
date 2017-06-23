
var mysql = require('mysql');
var SerialPort = require("serialport");
//console.log('hello iam connecting to serial port')
//opening the serial port.
var port = new SerialPort("COM21",{ //specify the port...
  //in this case u will hv to switch off Arduino IDE so as to avoid conflict of port COM21 with this program
  baudRate:9600, //this z optional ... coz it z already catered for.
  //// look for return and newline at the end of each data packet:
  //parsers: serialport.parsers.readline('r\n') //ReferenceError: serialport is not defined
    //parsers: SerialPort.parsers.readline('r\n')
   //parser: SerialPort.parsers.readline("\n") // '\n' can be any character of your choice
});

//initilise some global variables.

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
          //result z string array..  u could actually enclose this  from for()in function.... insertData(data){}
          for(var i = 0; i<x.length; i++){
              //thus start doing the comparison.
              //for the first slot A
              if (x[i].charAt(0) == 'A') { //A0 or A1
                 if (x[i].charAt(1) == '0') {
                    console.log("please upate slot A with  EMPTY ");
                    //insert into the database.
                 } else{
                    console.log("update slot A with OCCUPIED");
                 }
              }
              // for second slot B
               if (x[i].charAt(0) == 'B') { //A0 or A1
                 if (x[i].charAt(1) == '0') {
                    console.log("please upate slot B with  EMPTY ");
                 } else{
                    console.log("update slot B with OCCUPIED");
                 }
              }
                /*
              //for third slot C
               if (x[i].charAt(0) == 'C') { //A0 or A1
                 if (x[i].charAt(1) == '0') {
                    console.log("please upate slot C with  EMPTY ");
                 } else{
                    console.log("update slot C with OCCUPIED");
                 }
              }

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
          //traverse teh characters ... foreach() or normal loop..  


     })


});

//kati this will be like ur database function
/*function showMe(data){
	console.log(data.toString());
}*/

//controlling the timing to insert the data.. u cant insert data into the db all times
//setTimeout(showMe,1000);//wait 1s for everything to initialize correctly
//setInterval(showMe,5000);////write data every 5s or increase it to 10 seconds.. perform this action again after 5 seconds

 function insertData(data){
	//inserting teh data into the database... pliz perform the comparisons here.
     console.log("in charge of inserting into the database")
   //console.log("in charge of inserting the data", data[0]);
   if (data == 'A1') {
     console.log('iam seeing AAAAAAA')
   } else if (data == 'A0') {

   } else{
   	console.log('something z broken!!!');
   }

}

// open errors will be emitted as an error event
port.on('error', function(err){
   console.log('Error connecting to port. :', err.messsage); //error connecting to Arduino port
});

/*
for (var i = 0; i < h.length; i++) {
	h[i]
}; */