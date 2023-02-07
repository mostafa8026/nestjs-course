function logSomething() {
    console.log('test')
}

function log2() {
    console.log('test2')
    privateLog();
}

function privateLog() {
    console.log('private')
}

module.exports = {
    log1: logSomething,
    log2
};

//console.log(module);