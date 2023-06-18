function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const numberIterator = numberGenerator();
console.log(numberIterator.next().value)
console.log(numberGenerator().next().value)
console.log(numberGenerator().next().value)