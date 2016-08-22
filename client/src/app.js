import angular from 'angular'
require('jquery');
require('bootstrap');

var app = angular.module('ptm', []);

app.controller('playerController',['$http', '$scope', function($http, $scope) {
  var response = $http.get('/players').then(function(players) {
    $scope.players = players.data;
  }, function(err) {
    console.log(err);
  });

  $scope.mode = 'list';

  $scope.addPlayer = function(player) {
    console.log("Adding Player");
    player.image = $('#player-image').attr('src');
    $http.post('/players/add', {player: player}).success(function(data, status, headers, config) {
			console.log(data + " Status: " + status);
      $scope.players.push(player);
      $scope.mode = 'list';
		}).error(function(data, status, headers, config) {
			console.log( "failure message: " + JSON.stringify({data: data}));
		});
  };

  $scope.loadImage = function(files) {
    console.log("called");
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var imageType = /^image\//;

      if (!imageType.test(file.type)) {
        continue;
      }

      var img = $('#player-image');
      var reader = new FileReader();
      reader.onload = (function(aImg) {
        return function(e) {
          aImg.attr('src', e.target.result);
        };
      })(img);
      reader.readAsDataURL(file);
    }
  };
}]);

app.directive('createPlayer', function() {
  return {
    restrict: 'E',
    templateUrl: '../templates/create-player.html',
  }
});

app.directive('listPlayers', function() {
  return {
    restrict: 'E',
    templateUrl: '../templates/list-players.html'
  }
});

app.filter('ageFilter', function () {
    function calculateAge(dateString) { // birthday is a date
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return isNaN(age) ? null : age;
    }

    return function (birthdate) {
        return calculateAge(birthdate);
    };
});
