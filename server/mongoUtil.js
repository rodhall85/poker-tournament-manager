"use strict";

let mongo = require("mongodb");
let client = mongo.MongoClient;
let _db;

module.exports = {
  connect() {
    client.connect('mongodb://localhost:27017/poker-tournament-manager', (err, db) => {
      if(err) {
        console.log("Error connecting to Mongo - check mongod connection");
        console.log("ERROR: " + err);

        process.exit(1);
      }

      _db = db;
      console.log("Connected to Mongo");
    });
  },
  players(){
    return _db.collection('players');
  }
}
