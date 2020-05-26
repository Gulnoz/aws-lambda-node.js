var mysql = require('mysql');
var config = require('./config.json');
var util = require('util')

var pool = mysql.createPool({
host : config.dbhost,
user : config.dbuser,
password : config.dbpassword,
database : config.dbname
});
pool.query = util.promisify(pool.query);

exports.hendler = async (event) => {
    var result = await pool.query('select * from events;')
    return result;
};
