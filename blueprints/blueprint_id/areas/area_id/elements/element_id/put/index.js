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
    
    var total_properties = Object.keys(event.body).length;

    var sql = 'UPDATE blueprints_areas_elements SET ';
    
    var property_count = 1;
    for (const [key, value] of Object.entries(event.body)) {
      sql += key + " = '" + value + "'";
      if(property_count != total_properties){
        sql += ',';
      }
      property_count++;
    }

    sql += ' WHERE id = ' + connection.escape(event.element_id) + ' AND area_id = ' + connection.escape(event.area_id) + ' AND blueprint_id = ' + connection.escape(event.blueprint_id);
  
    connection.query(sql, function (error, results, fields) {

    callback( null );

  });
  connection.end();
});