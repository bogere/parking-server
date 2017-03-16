var mysql=require('mysql');
var connection=mysql.createPool({

host:'localhost',
user:'root',
password:'Bob100',
database:'rest'


});
module.exports=connection;
