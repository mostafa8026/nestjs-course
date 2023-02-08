const IntervalService = require('./event-emitter-with-class');

const is = new IntervalService();
is.start();

is.on('interval', (interval) => {
    console.log('Hanlder', interval);
})