console.log('Before')

getUser(1, (user) => {
    getPurchases(user.name, (purchases) => {
        console.log(purchases);
    })
})

console.log('After')

function getUser(id, callback){
    setTimeout(() => {
        callback({ id: id, name: 'mostafa' });
    }, 2000)
}

function getPurchases(name, callback) {
    setTimeout(() => {
        callback([1, 2, 3]);
    }, 2000)
}