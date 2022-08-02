async function run() {
    const got = await import('got')
    const response = await got.got.get('http://google.com');
    console.log(response.body)
}

run()

