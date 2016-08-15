"use strict";

var express = require('express');
var app = express();

app.use(express.static(__dirname + "/../client") );

app.get('/players', (request, response) => {
  var players = [
    {name: 'Rod Hall'},
    {name: 'Graham Pariss'}
  ];

  response.json(players);
});

app.listen(8181, () => console.log("Listening on port 8181"));
