const fs = require('fs');

fs.stat('asdfasd', (err, stats) => {
    if (err) {
        console.log(`An error occured: ${err}`);
    } else {
        console.log(stats);
    }
});
console.log('next line')