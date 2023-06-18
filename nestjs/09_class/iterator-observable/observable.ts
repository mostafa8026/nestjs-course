import { filter, map, of } from "rxjs";

const observable = of(1, 2, 3).pipe(
  map((num) => {
    return num * 5;
  }),
  filter((num) => {
    return num < 11;
  })
);

observable.subscribe({
  next: (data: any) => {
    console.log(data);
  },
  complete: () => {
    console.log("complete");
  },
  error: (error) => {

  }
});
