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

    var sql = "SELECT * FROM blueprints_areas_elements WHERE blueprints_areas_id = " + event.area_id + " AND element_id = " + event.body.element_id;
    connection.query(sql, function (error, results, fields) {    

      if(results.length == 0){
          
        var sql = 'INSERT INTO blueprints_areas_elements(blueprints_areas_id,element_id,description)';
        sql += " VALUES(" + event.area_id + "," + event.body.element_id + ",'" + event.body.description + "')";
        connection.query(sql, function (error, results, fields) {
      
          var response = {};
          response['id'] = results.insertId;
          response['name'] = event.name;
          response['description'] = event.body.description;

          callback( null, response );

        });

      }
      else{
        
        var element_id = results[0].id;

        var response = {};
        response['id'] = element_id;
        response['name'] = event.name;
        response['description'] = event.description;

        callback( null, response );        

      }

    });
});