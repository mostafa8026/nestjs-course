const repl = require('repl');

console.log(process.argv);

var i = 0;

setInterval(()=>{
    i++;
}, 1000)

function checkI(){
    console.log(i);
}

if(process.argv[2] && process.argv[2] === 'console') {
    const replServer = repl.start({
        prompt: ':) '
    });
    replServer.context.checkI = checkI;
}