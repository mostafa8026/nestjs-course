const { EventEmitter } = require("events");

/**
 * {
 *  name: string,
 *  callBack: func
 * }
 * 
 * down: if refrigerator is down
 */
const eventEmitter = new EventEmitter();
const callbacks = [];
let isRunning = false;

function addCallback(event, callBack) {
    // callbacks.push({
    //     event, callBack
    // });
    eventEmitter.on(event, callBack);
}

async function delay(ms) {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            resolve();
        }, ms)
    })
}

async function start() {
    isRunning = true;
    while(isRunning) {
        await delay(1000);
        console.log('Refrigerator is healthy')

        const random = Math.random() * 5;
        if(random > 3) {
            console.log('Rasing down event')
            // callbacks
            //     .filter(item => item.event === 'down')
            //     .map(item => item.callBack())
            eventEmitter.emit('down');
        }
    }
}

module.exports = {
    start,
    addCallback
};