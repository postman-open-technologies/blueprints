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

    var sql = 'DELETE FROM blueprints_answers WHERE blueprint_id = ' + event.blueprint_id + ' AND answer_id = ' + event.answer_id;
    connection.query(sql, function (error, results, fields) {

    callback( null );

  });
  connection.end();
});