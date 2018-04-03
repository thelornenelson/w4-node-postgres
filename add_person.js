const pg = require("pg");
const settings = require("./settings"); //settings.json

// const client = new pg.Client({
//   user  : settings.user,
//   password  : settings.password,
//   database  : settings.database,
//   host  : settings.hostname,
//   port  : settings.port,
//   ssl : settings.ssl
// });

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

const inputs = process.argv.slice(2);

// client.connect((err) =>{
//   if(err){
//     return console.error("Connection Error". err);
//   }

  function insertPerson(name, cb){

    knex("famous_people").insert({first_name: inputs[0], last_name: inputs[1], birthdate: inputs[2]}).asCallback(cb);
  }

  insertPerson(inputs, function(err){
    if(err){
      return console.error("error inserting", err);
    } else {
      console.log("Successfully added");
    }
    // client.end();
  });


// });
