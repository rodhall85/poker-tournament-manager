import angular from 'angular'
require('jquery')

var app = angular
  .module('ptm', [])
  .controller('playerController', ['$http', '$scope', playerController])

function playerController($http, $scope) {
  $scope.mode = 'list'
  $scope.setMode = setMode
  $scope.addPlayer = addPlayer
  $scope.deletePlayer = deletePlayer
  $scope.loadImage = loadImage

  $http.get('/players').then(function(players) {
    $scope.players = players.data
  }, function(err) {
    console.log(err) // eslint-disable-line no-console
  })

  function setMode(mode) {
    $scope.player = $scope.players[0]
    $scope.mode = mode
  }

  function addPlayer(player) {
    player.image = $('#player-image').attr('src')
    $http.post('/players/add', {player: player}).then(success, error(error))

    function success() {
      $scope.players.push(player)
      $scope.mode = 'list'
    }

    function error(error) {
      console.log( 'failure message: ' + JSON.stringify({data: error})) // eslint-disable-line no-console
    }
  }

  function deletePlayer(player) {
    $http.post('/players/delete', {player: player}).then(function() {
      setMode('list')
    }, function(err) {
      console.log(err) // eslint-disable-line no-console
    })
  }

  function loadImage(files) {
    for (var i = 0; i < files.length; i++) {
      var file = files[i]
      var imageType = /^image\//

      if (!imageType.test(file.type)) {
        continue
      }

      var img = $('#player-image')
      var reader = new FileReader() //eslint-disable-line no-undef
      reader.onload = (function(aImg) {
        return function(e) {
          aImg.attr('src', e.target.result)
        }
      })(img)
      reader.readAsDataURL(file)
    }
  }
}

app.directive('editPlayer', function() {
  return {
    restrict: 'E',
    templateUrl: '../templates/edit-player.html',
  }
})

app.directive('listPlayers', function() {
  return {
    restrict: 'E',
    templateUrl: '../templates/list-players.html'
  }
})

app.directive('deletePlayer', function() {
  return {
    restrict: 'E',
    templateUrl: '../templates/delete-player.html'
  }
})

app.filter('ageFilter', function () {
  function calculateAge(dateString) { // birthday is a date
    var today = new Date()
    var birthDate = new Date(dateString)
    var age = today.getFullYear() - birthDate.getFullYear()
    var m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return isNaN(age) ? null : age
  }

  return function (birthdate) {
    return calculateAge(birthdate)
  }
})
