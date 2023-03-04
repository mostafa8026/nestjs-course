import {readFile} from 'fs'
function readF(input: string) {
    return new Promise((resolve, reject) => {
        readFile(input, (err, data) => {
            if(err) {
                reject(err);
            }
            resolve(data);
        })
    })
}

async function run() {
    await readF('./got.js');
}

run();