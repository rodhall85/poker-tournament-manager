(function () {
    var app = angular.module('player' , [ ]);

    app.controller('PlayerController', function () {
        this.player = new Player(1, 'Rod Hall', 'Male', '15/07/1985', 'Loose', 'Description');
    });
    
    function Player(id, name4, sex, dob, style, description) {
        this.id = id;
        this.name = name;
        this.sex = sex;
        this.dob = dob;
        this.style = style;
        this.description = description;
    }

});