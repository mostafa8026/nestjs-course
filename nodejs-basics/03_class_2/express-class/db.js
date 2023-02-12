const fs = require('fs')
function getData() {
    return new Promise((resolve, reject) => {
        fs.readFile('./db/person.json', (err, data) => {
            if (err) {
                reject(err);
            }

            const stringData = Buffer.from(data).toString();
            resolve(JSON.parse(stringData));
        });
    });
}

function writeData(data) {
    const dataToBeWrite = JSON.stringify(data);
    return new Promise((resolve, reject) => {
        fs.writeFile('./db/person.json', dataToBeWrite, (err, data) => {
            if (err) {
                reject(err);
            }

            resolve(data);
        });
    });
}

module.exports = { getData, writeData }