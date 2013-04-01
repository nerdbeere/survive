var Timer = {

    timeoutID: null,

    lastFrame: null,
    currentFrame: null,

    delta: null,
    fps: 0,

    jobs: [],

    init: function() {

    },

    start: function(interval) {
        this.stop();

        //prevent framejump
        this.currentFrame = new Date().getTime();

        var that = this;
        this.timeoutID = setInterval(function() {
            that.run();
        }, interval);
    },

    run: function() {
        this.lastFrame = this.currentFrame;
        this.currentFrame = new Date().getTime();
        this.delta = this.currentFrame - this.lastFrame;

        this.fps = Math.round(1000 / this.delta);

        for(var i = 0; i < this.jobs.length; i++) {
            this.jobs[i](this);
        }
    },

    stop: function() {
        if(this.timeoutID !== null) {
            clearInterval(this.timeoutID);
        }
    },

    addJob: function(job) {
        this.jobs.push(job);
    }

};

exports.timer = Timer;