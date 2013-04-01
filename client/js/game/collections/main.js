Survive.Collections.Main = Class.extend({
    stack: [],
    init: function() {

    },
    add: function(element) {
        this.stack.push(element)
    },
    draw: function() {
        for(var i = 0; i < this.stack.length; i++) {
            this.stack[i].draw();
        }
    },
    clear: function() {
        this.stack = [];
    },
    set: function(stack) {
        this.stack = stack;
    }
});