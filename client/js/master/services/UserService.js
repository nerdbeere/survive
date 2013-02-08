Master.app.factory('User', function() {

    var user = {
        data: {
            email: '',
            password: ''
        },
        login: function() {
            console.log(this.data);
        },
        get: function() {
            return this;
        }
    };

    return {
        get: function() {
            return user;
        }
    }
});