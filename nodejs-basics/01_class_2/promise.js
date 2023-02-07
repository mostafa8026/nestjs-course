// function to get something from database

function getPerson() {
    const promise = new Promise((resolve, _) => {
        setTimeout(() => {
            resolve("After 2 second, Mostafa");
        }, 2000);
    })
    return promise;
}

// the real code which uses the above function
function run() {
    getPerson().then(data => {
        console.log(data);
    });
    console.log('After the database function');
}

run();