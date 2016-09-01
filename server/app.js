'use strict'

let express = require('express')
let mongoUtil = require('./mongoUtil')
let bodyParser = require('body-parser')
let app = express()

mongoUtil.connect()

app.use(express.static(__dirname + '/../client') )
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/players', (request, response) => {
  let players = mongoUtil.players()
  players.find().toArray((err,docs) => {
    if(err) {
      response.sendStatus(400)
    }
    response.json(docs)
  })
})

app.post('/players/add', (request, response) => {
  let player = request.body.player
  if (player == undefined) {
    response.sendStatus(400)
  }
  else {
    let players = mongoUtil.players()
    players.insert(player)
    response.sendStatus(201)
  }
})

app.post('/players/delete', (request, response) => {
  let player = request.body.player
  if (player == undefined) {
    response.sendStatus(400)
  }
  else {
    let players = mongoUtil.players()
    players.remove({_id: player._id})
    response.sendStatus(200)
  }
})

app.listen(8181, () => console.log('Listening on port 8181')) //eslint-disable-line no-console
