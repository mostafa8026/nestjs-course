let counter = 0;

function increment() {
    counter++;
    console.log(counter);
}

function decrement() {
    counter--;
    console.log(counter);
}

module.exports = {
    inc: increment,
    dec: decrement,
};
//console.log(module);