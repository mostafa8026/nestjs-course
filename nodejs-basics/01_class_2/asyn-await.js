// function to get something from database

async function getPerson() {
    const promise = new Promise((resolve, _) => {
        setTimeout(() => {
            resolve("After 2 second, Mostafa");
        }, 2000);
    })
    return promise;
}

// the real code which uses the above function
async function run() {
    const data = await getPerson()
    console.log(data);
}

run();
console.log('After the database function');