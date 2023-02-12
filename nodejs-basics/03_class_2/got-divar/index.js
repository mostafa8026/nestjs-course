const got = require('got');
 
const options = {
  headers: {
    'authority': 'api.divar.ir',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9,fa;q=0.8',
    'content-type': 'application/json',
    'origin': 'https://divar.ir',
    'referer': 'https://divar.ir/',
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
  },
  json: {
    'json_schema': {
      'category': {
        'value': 'cars'
      },
      'cities': [
        '3'
      ]
    },
    'last-post-date': 1676033830397868
  }
};
 
async function getData() {
  try {
    const response = await got.post('https://api.divar.ir/v8/web-search/3/cars', options);
    const json = JSON.parse(response.body);
    console.log(json);
  } catch (error) {
    console.log(error.response.body);
  }
}
 
getData();