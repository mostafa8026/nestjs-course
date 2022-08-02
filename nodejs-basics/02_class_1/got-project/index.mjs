import got from 'got';

const response = await got.get('http://google.com');
console.log(response.body)