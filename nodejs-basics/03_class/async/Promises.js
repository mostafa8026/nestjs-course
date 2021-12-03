// const promise = new Promise((resolve, reject) => {
//     setTimeout(() =>{
//         reject(new Error('error'))
//     }, 2000)
// });

// promise.then(data => {
//     console.log(data);
// }).catch(error =>{
//     console.log(error);
// })

getUser(1)
    .then(user=>{
        getPurchases(user.name)
    })
    .then(purchses => {
        console.log(purchses);
    })
    .catch(error => {
        console.log(error);
    });

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
            reject(new Error('error'))
        }, 2000)
    });
}