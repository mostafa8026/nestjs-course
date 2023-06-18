function numberGenerator() {
  let num: number = 1;

  return {
    [Symbol.iterator]: () => ({
      next: () => ({
        value: num++,
        done: num > 5 ? true : false,
      }),
    }),
  };
}

const numberIterator = numberGenerator();
for (const n of numberIterator) {
  console.log(n);
}
