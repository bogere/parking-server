
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

var s = "Goldsoft is good";
/*console.log(s.charAt(0));
console.log(s.charAt(3));*/

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