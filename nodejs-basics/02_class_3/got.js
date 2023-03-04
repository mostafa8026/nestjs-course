const got = require('got');

got.get('http://ifconfig.ovh').then(data => {
    console.log(data.body);
})