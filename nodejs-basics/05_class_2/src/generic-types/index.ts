
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(input: T) {
  console.log(input.length);
}

logLength('asdfasd');
logLength([1, 2, 3]);
logLength({ length: 5 });