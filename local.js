var mysql = require('mysql');
var config = require('./config.json');

var pool = mysql.createPool({
host : config.dbhost,
user : config.dbuser,
password : config.dbpassword,
database : config.dbname
});

pool.getConnection(function(error,connection){
console.log(error);
console.log(connection);
});
