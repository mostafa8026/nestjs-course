var log = function (name) {
    name = 'vahid';
    console.log('inside function ', name);
};
var b = 'mostafa';
log(b);
console.log(b);
var log2 = function (name) {
    name.id = 6;
    console.log('inside function ', name);
};
var a = { id: 5 };
log2(a);
console.log(a);
