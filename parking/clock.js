//playing with time in NodeJS..
 //var timestamp : parseInt(new Date().getTime()/1000, 10); //SyntaxError: Unexpected token :
  var timestamp = parseInt(new Date().getTime()/1000, 10);
  var funny = Number(new Date());
 console.log(timestamp);
 console.log(funny);

 //http://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
 //using clock stuff
 var clock = {
    now:Date.now(),
    add:function (qty, units) {
            switch(units.toLowerCase()) {
                case 'weeks'   :  val = qty * 1000 * 60 * 60 * 24 * 7;  break;
                case 'days'    :  val = qty * 1000 * 60 * 60 * 24;  break;
                case 'hours'   :  val = qty * 1000 * 60 * 60;  break;
                case 'minutes' :  val = qty * 1000 * 60;  break;
                case 'seconds' :  val = qty * 1000;  break;
                default       :  val = undefined;  break;
                }
            return val;
            },
    format:function (timestamp){
            var date = new Date(timestamp);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();
            // Will display time in xx/xx/xxxx 00:00:00 format
            return formattedTime = month + '/' + 
                                day + '/' + 
                                year + ' ' + 
                                hours + ':' + 
                                minutes.substr(-2) + 
                                ':' + seconds.substr(-2);
            }
};

 console.log(clock.format(clock.now));
//returns 10/8/2015 21:02:16
console.log(clock.format(clock.now + clock.add(10, 'minutes')));
//returns 10/8/2015 21:08:18

//If want a basic way to generate a timestamp in Node.js this works well.
var time = process.hrtime();
var timestamp = Math.round( time[ 0 ] * 1e3 + time[ 1 ] / 1e6 );
console.log(timestamp);

//This one has a solution : which converts unixtime stamp to tim in js try this
//var a = new Date(UNIX_timestamp*1000);
 var a = new Date()
var hour = a.getUTCHours();
var min = a.getUTCMinutes();
var sec = a.getUTCSeconds();
console.log(hour)


//simplest approach
var timestamp = new Date().getTime();
    console.log(timestamp);

//Here is a simple function to generate timestamp in the format: mm/dd/yy hh:mi:ss
function getTimeStamp() {
    var now = new Date();
    return ((now.getMonth() + 1) + '/' +
            (now.getDate()) + '/' +
             now.getFullYear() + " " +
             now.getHours() + ':' +
             ((now.getMinutes() < 10)
                 ? ("0" + now.getMinutes())
                 : (now.getMinutes())) + ':' +
             ((now.getSeconds() < 10)
                 ? ("0" + now.getSeconds())
                 : (now.getSeconds())));
}

getTimeStamp(); //call the function...

//In addition to the other options, if you want a dateformat ISO, you get can get it directly
console.log(new Date().toISOString());
//Just to add up, here's a function to return a timestamp string in Javascript. Example: 15:06:38 PM
function displayTime() {
    var str = "";

    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var seconds = currentTime.getSeconds()

    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    str += hours + ":" + minutes + ":" + seconds + " ";
    if(hours > 11){
        str += "PM"
    } else {
        str += "AM"
    }
    return str;
}

//var displayT = displayTime();
console.log(displayTime()); //this function formats the time every well