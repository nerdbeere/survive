Master.app.factory('User', function($rootScope) {

    var user = {
        data: {
            email: '',
            password: ''
        },
        login: function() {
            Master.app.io.emit('userLogin', this.data);
        },
        get: function() {
            return this;
        },
        init: function() {
           bindEvents();
        }
    };

    function bindEvents() {
        Master.app.io.on('userLoggedIn', function(data) {
            $rootScope.loggedIn = true;
        });
    }

    return {
        get: function() {
            return user;
        }
    }
});