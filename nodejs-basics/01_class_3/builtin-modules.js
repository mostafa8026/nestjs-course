const fs = require('fs');

const data = fs.readFileSync('./module.js', 'utf8');

console.log(data);

console.log('After read file')