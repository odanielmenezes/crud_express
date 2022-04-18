const EventEmmiter = require('events');

const emitter = new EventEmmiter()

emitter.on('log', (message) => {
    console.log(message)
})

function log(message) {
   emitter.emit('log', message);
}

log("AAAAAAAAAAAA")
log("AAAAAAAAAAAA")
log("AAAAAAAAAAAA")
log("AAAAAAAAAAAA")
log("AAAAAAAAAAAA")