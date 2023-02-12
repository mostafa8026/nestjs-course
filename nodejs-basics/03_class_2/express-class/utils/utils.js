function find(id, people) {
    const p = people.find((item) => {
        return item.id === Number(id);
    });

    return p;
}

function findIndex(id, people) {
    const index = people.findIndex((item) => {
        return item.id === Number(id);
    });

    return index;
}

module.exports = {find, findIndex}