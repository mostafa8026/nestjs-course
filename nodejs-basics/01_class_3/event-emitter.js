const {start, addCallback} = require('./refrigerator');

addCallback('down', () => {
    console.log('failure...')
})

start();