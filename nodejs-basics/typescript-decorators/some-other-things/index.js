import { log } from './log.js'
import http from 'http'
import https from 'https'

function getUrl(url) {
    return new Promise((resolve, reject) => {
        if (!url.startsWith('http')) {
            reject('Url must start with http')
        }
        http.request(url, (res) => {
            setTimeout(() => resolve(res.headers), 2000);
        }).end()
    })
}

async function main() {
    const output = await getUrl('http://decodl.net');
    log(output);
}

async function ret() {
    try {
        return await getUrl('asdfasdf');
    } catch (err) {
        console.log('ret got error', err);
    }
}

ret();