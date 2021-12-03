async function start() {
    try {
        Promise.all([
         getUser(1),
         getPurchases('asdfasdf')
        ]).then(data => {
            console.log(data);
        });
        console.log(purchases);
    } catch(error) {
        console.log(error);
    }
}

start()
// .catch(error => {
//         console.log(error);
//     });

function getUser(id){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: id, name: 'mostafa' });
        }, 2000)
    })
}

function getPurchases(name) {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve([1, 2, 3])
            //reject(new Error('async await error'))
        }, 2000)
    });
}