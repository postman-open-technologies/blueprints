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

    var sql = 'SELECT * FROM blueprints_areas WHERE id = ' + connection.escape(event.area_id) + ' AND blueprint_id = ' + connection.escape(event.blueprint_id);
    connection.query(sql, function (error, results, fields) {

    callback( null, results );

  });
  connection.end();
});