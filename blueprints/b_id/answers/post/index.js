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


    connection.connect(function(err) {
      if (err) throw err;

      var sql = "SELECT * FROM blueprints_answers WHERE blueprint_id = " + event.blueprint_id + " and answer_id = " + event.body.answer_id + " LIMIT 1";
      connection.query(sql, function (err, result, fields) {
        if(result.length > 0){
          callback( null, result[0] ); 
        }
        else{

          var sql = "INSERT INTO blueprints_answers(blueprint_id,answer_id) VALUES(" + event.blueprint_id + ", " + event.body.answer_id + ")";
        
          connection.query(sql, function (error, results, fields) {
        
            var inserted = {};
            inserted.id = results.insertId;
            inserted.blueprint_id = event.blueprint_id;
            inserted.answer_id = event.answer_id;
        
            callback( null, inserted );
      
          });          

        }
      });
    });

});