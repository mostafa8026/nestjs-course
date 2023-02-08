const { EventEmitter } = require('events');
const { delay } = require('../utils/delay');

class IntervalService extends EventEmitter {
    interval = 1;
    async start() {
        while (true) {
            console.log('Interval inside start', this.interval)
            await delay(this.interval * 100, () => {
                this.emit('interval', this.interval);
            })
            this.interval *= 2;
        }
    }
}

module.exports = IntervalService;