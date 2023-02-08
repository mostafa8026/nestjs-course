const moment = require('moment');

function delay(time, callback) {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            resolve(callback());
        }, time)
    })
}

async function getCurrentTime() {
    return moment().format('YYYY-MM-DD hh:mm:ss');
}

module.exports = { delay, getCurrentTime }