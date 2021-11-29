const EventEmitter = require('events');

const et = new EventEmitter();

const messageRaised = 'messageRaised'

function logger(){
    this.emit(this.messageRaised);
}

module.exports = { et, messageRaised }