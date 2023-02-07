// function to get something from database

function getPerson(callback) {
    setTimeout(() => {
        callback("After 2 second, Mostafa");
    }, 2000);
}

// the real code which uses the above function
function run() {
    const callback = (data) => {
        console.log(data);
    }
    getPerson(callback);
    console.log('After the database function');
}

run();