const { EventEmitter } = require('events');

const event = new EventEmitter();

event.on('click', (x, y) => {
    console.log(`Click happend! ${x}, 
    ${y}`)
})

event.emit('click', 5, 5);