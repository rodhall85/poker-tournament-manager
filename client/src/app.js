import angular from 'angular'

var app = angular.module('ptm', []);

app.controller('playerController', function($http) {
  var _this = this;
  var response = $http.get('/players').then(function(players) {
    _this.players = players.data;
  }, function(err) {
    console.log(err);
  });
});
