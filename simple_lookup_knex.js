const pg = require("pg");
const settings = require("./settings"); //settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});



function getPeople(name, cb){

  knex.select(knex.raw("first_name, last_name, TO_CHAR(birthdate, 'YYYY-MM-DD') AS birthdate")).from("famous_people").where({first_name: name}).orWhere({last_name: name}).asCallback(function(err, rows){
    if(err){
      cb(err);
    }
     cb(null, rows);

    knex.destroy(null);
  });
}

getPeople(process.argv[2], function(err, result){
  if(err){
    return console.error("error running query", err);
  }
  result.forEach(function(row, index){
    console.log(`- ${index + 1}: ${row.first_name} ${row.last_name}, born ${row.birthdate}`);
  });
});
