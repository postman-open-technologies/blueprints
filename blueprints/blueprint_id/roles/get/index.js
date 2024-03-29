const vandium = require('vandium');
const mysql  = require('mysql');

exports.handler = vandium.generic()
  .handler( (event, context, callback) => {

    var connection = mysql.createConnection({
    host     : process.env.host,
    user     : process.env.user,
    password : process.env.password,
    database : process.env.database
    });

    var sql = 'SELECT * FROM roles t INNER JOIN blueprints_roles bt ON t.id = bt.role_id WHERE bt.blueprint_id = ' + event.blueprint_id + ' ORDER BY t.Name';
    connection.query(sql, function (error, results, fields) {
    callback( null, results );
  });
  connection.end();
});