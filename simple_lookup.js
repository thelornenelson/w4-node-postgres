const pg = require("pg");
const settings = require("./settings"); //settings.json

const client = new pg.Client({
  user  : settings.user,
  password  : settings.password,
  database  : settings.database,
  host  : settings.hostname,
  port  : settings.port,
  ssl : settings.ssl
});

client.connect((err) =>{
  if(err){
    return console.error("Connection Error". err);
  }

  function selectPerson(name, cb){
    client.query("SELECT first_name, last_name, TO_CHAR(birthdate, 'YYYY-MM-DD') AS birthdate FROM famous_people WHERE last_name LIKE $1 OR first_name LIKE $1", [name], cb);
  }

  selectPerson(process.argv[2], function(err, result){
    if(err){
      return console.error("error running query", err);
    }
    result.rows.forEach(function(row, index){
      console.log(`- ${index + 1}: ${row.first_name} ${row.last_name}, born ${row.birthdate}`);
    });
    client.end();
  });

});
