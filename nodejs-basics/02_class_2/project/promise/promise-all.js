const promise1 = new Promise((resolve, _) => {
    setTimeout(() => {
        resolve(1);
    }, 1000);
})

const promise2 = new Promise((resolve, _) => {
    setTimeout(() => {
        resolve(2);
    }, 2000);
})

async function run() {
    const arr = await Promise.all([promise1, promise2]);
    console.log(arr);
}

run();