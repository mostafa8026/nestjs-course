const log = (name: string) {
    name = 'vahid';
    console.log('inside function ', name);
}

const b = 'mostafa'
log(b);
console.log(b)

const log2 = (name: {
    id: number
}) => {
    name.id = 6;
    console.log('inside function ', name);
}

const a = {id: 5};
log2(a);
console.log(a);